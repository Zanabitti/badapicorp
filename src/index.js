import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CButton from './components/Button';
import DTable from './components/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import fd from './fetchdata';

class App extends React.Component {
  render() { 
    return (
      <Container fluid>
        <Navbar variant="dark" bg='dark'>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <CButton categ='Gloves'/>
          <CButton categ='Beanies'/>
          <CButton categ='Facemasks'/>
        </Navbar> 
        <div>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
