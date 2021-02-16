

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
                if(!res.ok) throw new Error('Response error: '+res.status);
                if (res.headers.get('x-error-modes-active').length > 1) throw new Error('X');
                else return Promise.resolve(res);
                

            } catch (err) {
                if (n === 1) { throw new Error('n is 1'); }
                else if (err.message === 'X') { console.log('retried url:' + url); }
                else { return; }
                return await fetch_retry(url, n - 1);
            }
        }
        
        
        let completedata = {};
        let categs = new Set(['gloves','beanies','facemasks']);
        let catdata = {};
        let mfrs = new Set();
        let stockdata = {};
        let catNotFound = false;

        for(let cat of categs) {
            catNotFound = false;
            let curl = `https://tempprox.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/${cat}`;
            
            try {
                let res = await fetch(curl);
                catdata = await res.json();
            } catch(err) {
                catNotFound = true;
            }
            if(!catNotFound) {
                completedata[cat] = {};
                for(let i in catdata){
                    if(catdata[i].manufacturer !== undefined) mfrs.add(catdata[i].manufacturer);
                    let itemid = catdata[i]['id'].toUpperCase();
                    completedata[cat][itemid] = catdata[i];

                }
            }
            
        }

        if(Object.keys(catdata).length === 0) throw new Error('nodata');
        this.setPercent(20, 'Products');
        this.completionPCT = 20;
        this.notch = Math.floor((80/mfrs.size));
        let rdata = {};
        let notFound = false;
        for(let name of mfrs) {

            
            this.setPercent(this.completionPCT, name);

            let aurl = `https://tempprox.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/${name}`;
            try {
                let res2 = await fetch_retry(aurl, 5);
                rdata = await res2.json();
            } catch (err) {
                notFound = true;
            }
            
            if(!notFound) {
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
        
        
        return completedata;
    }
}

export default Fetcher;