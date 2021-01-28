import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './Components/Products';
import AddProduct from './Components/AddProduct'
import AddProductCart from './Components/AddProductCart'
import Cart from './Components/ProductCart'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/products' exact={true} component={Products}/>
          <Route path='/products/:id' exact={true} component={AddProduct}/>
          <Route path='/carts' exact={true} component={Cart}/>
          <Route path='/carts/:id' exact={true} component={AddProductCart}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
