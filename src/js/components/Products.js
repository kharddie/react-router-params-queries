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

  handleClick = () => {
    // console.log('From handleClick()', this);
    this.setState({ numOfClicks: this.state.numOfClicks + 1 });
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

    const { categoriesDetails, productsDetails, productDelete, errorLoading } = this.props.dataToProps;
    var productsArr = [];
    const categoriesProductsArr = [];

    //console.log('**************From render() data=', this);
    if (errorLoading.loading) {
      return <div className="container"><h1>Loading...</h1></div>
    }

    if (errorLoading.error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    //combine categories and products
    if (categoriesDetails.data.length > 0 && productsDetails.data.length > 0) {
      categoriesDetails.data.map(function (data, index) {
        productsDetails.data.map(function (data2, index2) {
          if (data2.category_id == data.id) {
            productsArr.push({
              prodId: data2.id,
              prodCategoryId: data2.category_id,
              prodName: data2.name,
              prodprice: data2.price,
              prodDescription: data2.description,
            });
          }
        })
        categoriesProductsArr.push({
          catId: data.id,
          catName: data.name,
          catDescription: data.description,
          products: productsArr
        })
        productsArr = [];
      })
    }







    return (
      <div className="container">
        <h1>Posts</h1>

        <div>
          <button onClick={this.handleClick}>Click Me!</button>
          <p>Number of Times Clicked = {this.state.numOfClicks}</p>
        </div>

        <ul className="list-group">
          {this.renderPosts(categoriesProductsArr)}
        </ul>
      </div>
    );
  }
}


export default Products;
