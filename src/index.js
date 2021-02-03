import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CButton from './components/Button';
import DTable from './components/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Nav from 'react-bootstrap/Nav'
import fd from './fetchdata';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Jumbotron from 'react-bootstrap/Jumbotron';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFetched : false,
      isFetchingBg : false,
      dataExpiry : null,
      itemData : null,
      categ : 'gloves',
      fd : new fd(this.getPercent.bind(this)),
      completionPT : 0,
      loadingTG : ''
    }
  }


  componentDidMount(){
    setInterval( () => {
      this.setState({ dataExpiry : this.state.dataExpiry+1});
    }, 1000);

    this.state.fd.fetchData().then(resp => {
        this.setState({
            isFetched : true,
            itemData : resp,
            dataExpiry : 0
        });
    }); 
  }

  componentDidUpdate(){
    if(this.state.dataExpiry >= 300)  {
        if(this.state.isFetchingBg === false) {
          this.state.fd.fetchData().then( resp => {
           this.setState({
              dataExpiry : 0,
              itemdata : resp,
              isFetchingBg : false
           }); 
          });
        
          this.setState({
            isFetchingBg : true
          });
        }
    }
    
  }

  getCateg = (catName) => {
      let cat = catName.toLowerCase();
      this.setState({ categ : cat});
  }
  
  getPercent = (pct,tgt) => {
    this.setState({ 
        completionPT : pct,
        loadingTG : tgt
    });
  }

  render() {
    const cat = this.state.categ;
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
          {(this.state.isFetched !== true) &&  
          <Jumbotron>
          <h3 className='text-center'>Loading data: {this.state.loadingTG}</h3>  
          <ProgressBar animated variant='success' now={this.state.completionPT} />
          </Jumbotron>}
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
