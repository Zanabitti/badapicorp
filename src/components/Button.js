import React from 'react';
import Nav from 'react-bootstrap/Nav';


class CButton extends React.Component {
    constructor(props){
        super(props);
        this.categ = props.categ;
    }

    render() {
        return (<Nav.Link>{this.categ}</Nav.Link>);
    }
}

export default CButton;