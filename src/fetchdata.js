export function fetchData(cat) {
    let url = 'https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/' + cat;
    let mfrs = new Set();
    fetch(url)
    .then(r => r.json())
    .then( data =>
    {

        for(let i in data){
           if(data[i].manufacturer !== undefined) mfrs.add(data[i].manufacturer);
        }
        console.log(mfrs);
        for(let name of mfrs) {
            // fetch each manuf stock data -> 
            /*
                object with {id: x, stock: y}} collect all manufs to same maybe?
                iterate data ->
                    add to object data[i] value manuobj[data.id].stock 
            */
        }
    }
    ).catch(error => console.log(error.message));

    

}

export default fetchData;