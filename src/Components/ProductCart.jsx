import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';

class ProductsCart extends Component{

    state={
        productcarts:[],isLoading:true
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });
        fetch("/api/v1/productcarts").then(response => response.json()).then(data=> this.setState({productcarts:data,isLoading:false}))

    }
    async remove(id) {
        await fetch(`/api/v1/productcarts/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedProducts = [...this.state.productcarts].filter(i => i.id !== id);
          this.setState({productcart: updatedProducts});
        });
      }

    render(){
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }


        const productList = this.state.productcarts.map(productcart => {
      
            return <tr key={productcart.id}>
              <td>{productcart.id}</td>
              <td style={{whiteSpace: 'nowrap'}}>{productcart.product.nombre}</td>
              <td>{productcart.quantity}</td>
              <td>{productcart.carts.status}</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" color="primary" tag={Link} to={"/carts/" + productcart.id}>Edit</Button>
                  <Button size="sm" color="danger" onClick={() => this.remove(productcart.id)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          });
        return(
            <div>
                <AppNavbar/>
                <Container fluid> 
                <br></br>             
                <h3>Lista Productos Prueba Tul</h3>
                <div>
                <Button color="success" tag={Link} to="/carts/new">Nuevo Compra</Button>
                </div>
                <br></br>
                <div className="row justify-content-center">
                <Table className="col-sm-9" bordered sm>
                    <thead>
                    <tr>
                    <th width="10%">Id</th>
                    <th width="20%">Nombre Producto</th>
                    <th width="20%">Cantidad</th>
                    <th>Estado</th>
                    <th width="10%">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productList}
                    </tbody>
                </Table>
                </div>
                </Container>
            </div>
        )
    }





}


export default ProductsCart