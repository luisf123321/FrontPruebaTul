import React, { Component } from 'react';
//import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
//import { Link } from 'react-router-dom';


class MostProducts extends Component{

    state={
        products:[],isLoading:true
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });
        fetch("/api/v1/products").then(response => response.json()).then(data=> this.setState({products:data,isLoading:false}))

    }
    async remove(id) {
        await fetch(`/api/v1/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedProducts = [...this.state.products].filter(i => i.id !== id);
          this.setState({products: updatedProducts});
        });
      }

    render(){
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }


        const productList = this.state.products.map(product => {
      
            return <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            
                            <div class="card-body">
                                <h4 class="card-title">
                                {product.nombre}</h4>
                                <h5>{product.sku}</h5>
                                <p class="card-text"></p>
                                <button type="button" class="btn btn-primary btn-sm">Buy</button>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                            </div>                    
                        </div>
                    </div>
          });
        return(
            <>                
                <div class="col-lg-9">
                    <div class="row">
                        {productList}
                    </div>
                </div>                    
            </>      
                
        )
    }




}

export default MostProducts;