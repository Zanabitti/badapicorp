import React from 'react';

class Theaders extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isDataHandled : false,
            parsedData : []
        };
    }
    
    componentDidUpdate(prev){
        if(prev.fdata !== this.props.fdata) this.parseHeaders();
    }

    parseHeaders(){
        let pd = Object.keys(this.props.fdata[Object.keys(this.props.fdata)[0]]).map((key,index) => {
            return <th key={index}>{key}</th>
        });
        this.setState({ isDataHandled : true});
        this.setState({ parsedData : pd });
    }

    render(){

        return (<thead> 
            <tr>
                {this.state.parsedData}
            </tr>
        </thead>);
    }
}

export default Theaders;