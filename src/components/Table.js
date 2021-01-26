import React from 'react';
import Thead from 'components/TableHeader';
import fd from 'fetchdata';
import Table from 'react-bootstrap/Table';

class DTable extends React.Component {
    constructor(props) {
        super(props);
        this.categ = props.categ;
        this.data = fd();
    }

    render() {
        return(<Table striped bordered hover variant="dark">
                    <Thead singleItem={data[categ][0]} />
                </Table>);
    }
}

export default DTable;