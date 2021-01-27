import React from 'react';
import Thead from './TableHeader';
import fd from '../fetchdata';
import Table from 'react-bootstrap/Table';

class DTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(<Table striped bordered hover variant="dark">
                </Table>);
    }
}

export default DTable;