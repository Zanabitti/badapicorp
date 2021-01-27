import React from 'react';
import Thead from './TableHeader';
//import fd from '../fetchdata';
import Table from 'react-bootstrap/Table';

const data = {'beanies': { '123456' : { 
    'id' : '123456',
    'type' : 'beanies',
    'name' : 'superhat',
    'color' : '["black"]',
    'price' : '71',
    'manufacturer' : 'bitchinclothes',
    'stock' : 'IN STOCK'
}}};


class DTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isFetched : false,
            testData : {}
        };
    }

    componentDidMount(){
        this.setState({ testData : data['beanies']});
        this.setState({ isFetched : true});
    }

    render() {
        console.log(this.state);
        return(<Table striped bordered hover variant="dark">
                    <Thead fdata={this.state.isFetched ? this.state.testData : {}}/>
                </Table>);
    }
}

export default DTable;