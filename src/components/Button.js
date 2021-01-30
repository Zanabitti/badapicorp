import React from 'react';
import Nav from 'react-bootstrap/Nav';


class CButton extends React.Component {
    constructor(props){
        super(props);
        this.categ = props.categ;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.setCateg(this.categ);
    }

    render() {
        return (<Nav.Link onClick={this.handleClick}>{this.categ}</Nav.Link>);
    }
}

export default CButton;