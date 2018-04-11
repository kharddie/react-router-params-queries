import React, { Component } from 'react';
import { Link } from 'react-router';

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      numOfClicks: 0
    }
  }

  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
    //this.props.deleteProduct();
  }

  registerUser = (e) => {
    e.preventDefault();
    const username = e.target.elements.userName.value;
    const password = e.target.elements.password.value;
  }

  state = {

  }

  deleteProduct = (event) => {
    this.props.deleteProduct(event.prodId);
    //this.setState({numOfClicks: this.state.numOfClicks + 1});
  }

  handleClick = () =>{
   // console.log('From handleClick()', this);
    this.setState({numOfClicks: this.state.numOfClicks + 1});
  }
  
  renderProducts = (data) => {
    if (data.length > 0) {
      return data.map((data, key) => {
        //console.log('From renderProducts()', this);
        return (
          <span>
            <span key={key}> {data.prodCategoryId} ({data.prodName}) {data.prodDescription} {data.prodprice}
            </span>
            <i class="fas fa-arrow-alt-down"></i> <a className='btn' onClick={() => this.deleteProduct(data)}>delete</a>
 
            <br />
          </span>
        );
      })
    }
  }

  renderPosts = (data) => {
    //console.log('From renderPosts()', this);
    return data.map((data) => {
      return (
        <div>
          <span> <strong>{data.catName} ({data.catId}) {data.catDescription}</strong></span><br />
          <span>
            {this.renderProducts(data.products)}
          </span>
        </div>
      );
    })
  }

  render() {

    const { data, loading, error } = this.props.categoriesProductsData;
    console.log('**************From render() data=' + data +'  loading=' + loading+ '  eror=' + error);

    if (error) {
      return <div className="container"><h1>Products</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Posts</h1>

        <div>
          <button onClick={this.handleClick}>Click Me!</button>
          <p>Number of Times Clicked = {this.state.numOfClicks}</p>
        </div>

        <ul className="list-group">
          {this.renderPosts(data)}
        </ul>
      </div>
    );
  }
}


export default Products;
