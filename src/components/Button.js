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
        return (<Nav.Item className='d-flex'><Nav.Link className='' onClick={this.handleClick}>{this.categ}</Nav.Link></Nav.Item>);
    }
}

export default CButton;