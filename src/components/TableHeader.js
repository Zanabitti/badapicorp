import React from 'react';

class Theaders extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let headerlist = Object.keys(this.props.singleItem).map(head =>{
            <th>{head}</th>;
        });

        return (<thead> 
            <tr>
                {headerlist}
            </tr>
        </thead>);
    }
}

export default Theaders;