export async function fetchData() {
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
        let res2 = await fetch(aurl);
        let rdata = await res2.json();

        //console.log(rdata.response[0]['DATAPAYLOAD']);
        
        if( rdata.response[0] !== 'undefined' ) {
            for(let i = 0; i<rdata.response.length; i++){
                let payload = rdata.response[i]['DATAPAYLOAD'];
                let needle = '<INSTOCKVALUE>';
                let cut0 = payload.search(needle) + needle.length;
                let cut1 = payload.search('</INSTOCK');
                stockdata[rdata.response[i]['id']] = payload.substring(cut0,cut1);
                
            }
        }
    
    }

    //for(let cat of categs){
    //add stock data to relevant ids
    //}

    
    console.log(completedata);

}


export default fetchData;