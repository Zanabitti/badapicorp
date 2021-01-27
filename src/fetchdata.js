
export async function fetchData() {
    
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
        let curl = `https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/${cat}`;
        let res = await fetch(curl);
        let catdata = await res.json();
        completedata[cat] = {};
        for(let i in catdata){
            if(catdata[i].manufacturer !== undefined) mfrs.add(catdata[i].manufacturer);
            let itemid = catdata[i]['id'].toUpperCase();
            completedata[cat][itemid] = catdata[i];

        }
    }
 
    for(let name of mfrs) {
        let aurl = `https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/${name}`;
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
    
    }

    for(let cat of categs){
    //add stock data to relevant ids
        Object.keys(completedata[cat]).forEach(key => {
            completedata[cat][key]['stock'] = stockdata[key];
        });
    }


    console.log(completedata);
    //return completedata;
}


export default fetchData;