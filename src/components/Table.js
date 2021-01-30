import React from 'react';
import Table from 'react-bootstrap/Table';


class DTable extends React.Component {

    createHeaders(){
            let fullHeaders = [];

            let ths = Object.keys(this.props.itemData[Object.keys(this.props.itemData)[0]]).map((key, index) => {
                return <th key={index}>{key}</th>
            });

            fullHeaders.push(<tr key='xyz'>{ths}</tr>);

            return fullHeaders;
    }

    createRows(){
            return Object.keys(this.props.itemData).map((id, index) => {
                const { type, name, color, price, manufacturer, stock} = this.props.itemData[id];
                return (<tr key={id}>
                    <td>{id}</td><td>{type}</td><td>{name}</td><td>{color}</td><td>{price}</td>
                    <td>{manufacturer}</td><td>{stock}</td>
                </tr>)
            })
    }

    render() {
        return(<Table striped bordered hover variant="dark">
                    
                    <thead>{this.createHeaders()}</thead>
                    <tbody>{this.createRows()}</tbody>
                   
                </Table>);
    }
}

export default DTable;