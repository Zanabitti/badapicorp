import React from 'react';

import CButton from './components/Button';
import DTable from './components/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Nav from 'react-bootstrap/Nav'
import fd from './fetchdata';
//import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
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
      loadingTG : '',
      isFetchError : false
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
    })
    .catch((err) => { 
        this.setState({
            dataExpiry : 0,
            isFetchError : true,
            loadingTG : 'Failed'
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
          })
          .catch((err) => { 
            if(err.message === 'nodata') {
              this.setState({
                dataExpiry : 0,
                isFetchingBg : false
              });
            }
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
        
        <Nav className='justify-content-end'>
        <CButton setCateg={this.getCateg.bind(this)} categ='Gloves'/>
        <CButton setCateg={this.getCateg.bind(this)} categ='Beanies'/>
        <CButton setCateg={this.getCateg.bind(this)} categ='Facemasks'/>
        </Nav>
        
      </Navbar>
      <Container fluid='lg' className="px-0">
 
        <div>
          {(this.state.isFetched !== true && this.state.isFetchError !== true) &&  
            <Jumbotron>
              <p className='text-center'>Loading data: {this.state.loadingTG}</p>  
              <ProgressBar animated variant='success' now={this.state.completionPT} />
            </Jumbotron>}
          {(this.state.isFetched !== true && this.state.isFetchError) &&
            <Jumbotron>
              <p className='text-center'>Loading data: {this.state.loadingTG}</p>
              <p className='text-center'>No dataset could be found or a network error occured, please refresh the page.</p> 
              <ProgressBar animated variant='danger' now='100' />
            </Jumbotron>
          }
          {this.state.isFetched && <DTable itemData={this.state.itemData[cat]}/>}
        </div>
      </Container>
      </div>
    );
  }
}

export default App;