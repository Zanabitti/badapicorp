import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CButton from './components/Button';
import DTable from './components/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import fd from './fetchdata';

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
    /*fd().then(resp => {
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
    return (
      <Container fluid>
        <Navbar variant="dark" bg='dark'>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <CButton setCateg={this.getCateg.bind(this)} categ='Gloves'/>
          <CButton setCateg={this.getCateg.bind(this)} categ='Beanies'/>
          <CButton setCateg={this.getCateg.bind(this)} categ='Facemasks'/>
        </Navbar> 
        <div>
          {this.state.isFetched && <DTable itemData={this.state.itemData[cat]}/>}
        </div>
      </Container>
    );
  }
}

//fd();
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
