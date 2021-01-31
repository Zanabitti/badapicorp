import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CButton from './components/Button';
import DTable from './components/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav'
import fd from './fetchdata';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const data = {'beanies': { '123456' : { 
  'id' : '123456',
  'type' : 'beanies',
  'name' : 'superhat',
  'color' : '["black"]',
  'price' : '71',
  'manufacturer' : 'bitchinclothes',
  'stock' : 'IN STOCK'
}},
  'gloves': { '987654' : {
  'id' : '987654',
  'type' : 'gloves',
  'name' : 'funkyhat',
  'color': 'red',
  'price': '123',
  'manufacturer' : 'okkau',
  'stock' : 'less than 10'
}}};


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFetched : false,
      itemData : null,
      categ : 'beanies' 
    }
  }


  componentDidMount(){

    //Online data
    /*
    fd().then(resp => {
        this.setState({
            isFetched : true,
            itemData : resp
        });
    }); */

    //Offline testdata
    
    this.setState({
      isFetched : true,
      itemData : data
    });
    
  }

  getCateg = (catName) => {
      let cat = catName.toLowerCase();
      this.setState({ categ : cat});
  }


  render() {
    const cat = this.state.categ;
    console.log(this.state.itemData);
    return (
      <div>
      <Navbar variant="dark" bg='dark' sticky='top' expand='sm'>
        <Navbar.Brand href="#home">BadApi Co.</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarCollapse>
        <Nav className='justify-content-end'>
        <CButton setCateg={this.getCateg.bind(this)} categ='Gloves'/>
        <CButton setCateg={this.getCateg.bind(this)} categ='Beanies'/>
        <CButton setCateg={this.getCateg.bind(this)} categ='Facemasks'/>
        </Nav>
        </NavbarCollapse>
      </Navbar>
      <Container fluid='lg' className="px-0">
 
        <div>
          {(this.state.isFetched !== true) &&  <Spinner animation="border" variant="danger" />}
          {this.state.isFetched && <DTable itemData={this.state.itemData[cat]}/>}
        </div>
      </Container>
      </div>
    );
  }
}

//fd();
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
