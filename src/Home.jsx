import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import MostProducts from './Components/MosProductoc'

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/> 
        <div></div>              
        <div class="Container">
          <div class="row">
            <div class="col-lg-3">
              <h1 class="my-4">CATEGORIAS</h1>
              <div class="list-group" id="div_categories">
              </div>
            </div>
            <MostProducts/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;