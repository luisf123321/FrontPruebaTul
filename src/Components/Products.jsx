import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';

class Products extends Component{

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
      
            return <tr key={product.id}>
              <td>{product.id}</td>
              <td style={{whiteSpace: 'nowrap'}}>{product.nombre}</td>
              <td>{product.sku}</td>
              <td>{product.descripcion}</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" color="primary" tag={Link} to={"/products/" + product.id}>Edit</Button>
                  <Button size="sm" color="danger" onClick={() => this.remove(product.id)}>Delete</Button>
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
                <Button color="success" tag={Link} to="/products/new">Producto Nuevo</Button>
                </div>
                <br></br>
                <div className="row justify-content-center">
                <Table className="col-sm-9" bordered sm>
                    <thead>
                    <tr>
                    <th width="10%">Id</th>
                    <th width="20%">Nombre</th>
                    <th width="20%">sku</th>
                    <th>descripcion</th>
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


export default Products