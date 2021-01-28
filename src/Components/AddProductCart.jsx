import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';

class AddProductCart extends Component {

  emptyItem = {
    quantity: '',
    product: {},
    carts: {}
  };

  state ={
    item: this.emptyItem
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const product = await (await fetch(`/api/v1/productcarts/${this.props.match.params.id}`)).json();
      this.setState({item: product});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    if(name==='product'||name==='carts'){
        item[name] = {'id':value}
        this.setState({item});
        console.log(name,value,item[name],item)
    }else{
        item[name] = value;
        this.setState({item});
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    await fetch('/api/v1/productcarts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item),
    });
    this.props.history.push('/carts');
  }

  render() {
    

    return <div>
      <AppNavbar/>
      <Container>
        <div className="row justify-content-center" >
       <div className="col-sm-9" >
        <Form  onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label for="product">Producto ID</Label>
                <Input type="number" name="product" id="product" value={this.state.item.product.id || ''}
                    onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Estado</Label>
                <select name="carts" value={this.state.item.carts.id} onChange={this.handleChange}>
                    <option value={15}>completed</option>
                    <option value={14}>pending</option>
                </select>
            </FormGroup>
          <FormGroup>
            <Label for="quantity">Cantidad</Label>
            <Input type="number" name="quantity" id="quantity" value={this.state.item.quantity || ''}
                   onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/carts">Cancel</Button>
          </FormGroup>
        </Form>
        </div>
        </div>
      </Container>
    </div>
  }
}

export default withRouter(AddProductCart);