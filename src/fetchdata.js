

class Fetcher{ 

    constructor(percentRef){
        this.completionPCT = 0;
        this.notch = 0;
        this.setPercent = percentRef || null;
    }


    async fetchData() {

        async function fetch_retry(url, n) {
            try {
                let res = await fetch(url);
                if (res.headers.get('x-error-modes-active').length > 1) throw new Error('x-error');
                else return Promise.resolve(res);
                

            } catch (err) {
                if (n === 1) throw new Error('n is 1');
                console.log('retried url:' + url);
                return await fetch_retry(url, n - 1);
            }
        }
        
        
        let completedata = {};
        let categs = new Set(['gloves','beanies','facemasks']);

        let mfrs = new Set();
        let stockdata = {};

        for(let cat of categs) {
            let curl = `https://tempprox.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/${cat}`;
            let res = await fetch(curl);
            let catdata = await res.json();
            completedata[cat] = {};
            for(let i in catdata){
                if(catdata[i].manufacturer !== undefined) mfrs.add(catdata[i].manufacturer);
                let itemid = catdata[i]['id'].toUpperCase();
                completedata[cat][itemid] = catdata[i];

            }
            
        }

        this.setPercent(20, 'Products');
        this.completionPCT = 20;
        this.notch = Math.floor((80/mfrs.size));
        for(let name of mfrs) {

            
            this.setPercent(this.completionPCT, name);

            let aurl = `https://tempprox.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/${name}`;
            let res2 = await fetch_retry(aurl, 5);
            let rdata = await res2.json();

            
            if( rdata.response.length > 5 ) {
                for(let i = 0; i<rdata.response.length; i++){
                    let payload = rdata.response[i]['DATAPAYLOAD'];
                    let needle = '<INSTOCKVALUE>';
                    let cut0 = payload.search(needle) + needle.length;
                    let cut1 = payload.search('</INSTOCK');
                    stockdata[rdata.response[i]['id']] = payload.substring(cut0,cut1);
                    
                }
            }
            this.completionPCT += this.notch;
        }

        this.setPercent(this.completionPCT, 'Stockpiles');
        for(let cat of categs){
        //add stock data to relevant ids
            Object.keys(completedata[cat]).forEach(key => {
                completedata[cat][key]['stock'] = stockdata[key];
            });
        }
        

        console.log(completedata);
        
        return completedata;
    }
}

export default Fetcher;