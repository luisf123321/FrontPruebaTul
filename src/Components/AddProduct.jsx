import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';

class AddProduct extends Component {

  emptyItem = {
    nombre: '',
    sku: '',
    descripcion: ''
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
      const product = await (await fetch(`/api/v1/products/${this.props.match.params.id}`)).json();
      this.setState({item: product});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    await fetch('/api/v1/products/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item),
    });
    this.props.history.push('/products');
  }

  render() {
    

    return <div>
      <AppNavbar/>
      <Container>
        <div className="row justify-content-center" >
       <div className="col-sm-9" >
        <Form  onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nombre">Nombre</Label>
            <Input type="text" name="nombre" id="nombre" value={this.state.item.nombre || ''}
                   onChange={this.handleChange} autoComplete="product"/>
          </FormGroup>
          <FormGroup>
            <Label for="sku">sku</Label>
            <Input type="text" name="sku" id="sku" value={this.state.item.sku || ''}
                   onChange={this.handleChange} autoComplete="product"/>
          </FormGroup>
          <FormGroup>
            <Label for="descripcion">descripcion</Label>
            <Input type="text" name="descripcion" id="descripcion" value={this.state.item.descripcion || ''}
                   onChange={this.handleChange} autoComplete="product"/>
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/products">Cancel</Button>
          </FormGroup>
        </Form>
        </div>
        </div>
      </Container>
    </div>
  }
}

export default withRouter(AddProduct);