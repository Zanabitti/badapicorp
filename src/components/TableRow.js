import React from 'react';


class Trows extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isDataHandled : false,
            parsedData : []
        };
    }
    
    componentDidUpdate(prev){
        if(prev.fdata !== this.props.fdata) this.parseCells();
    }

    parseCells(){
        console.log(this.props.fdata);
        let singleItem = Object.values(this.props.fdata).map((key,index) => {
            return <td key={index}>{key}</td>
        });
 
        this.setState({ isDataHandled : true});
        this.setState({ parsedData : singleItem });
    }

    render(){
        console.log('row parsed');
        return (<tr>{this.state.parsedData}</tr>);
    }
}

export default Trows;