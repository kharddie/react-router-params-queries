import React, { Component } from 'react';
import { Link } from 'react-router';

class Products extends React.Component {
  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  renderProducts(data) {
    if (data.length > 0) {
      return data.map(function (data, key) {
        return (
          <span>
          <span key={key}> {data.prodCategoryId} ({data.prodName}) {data.prodDescription} {data.prodprice}
          </span><br/>
          </span>
        );
      })
    }
  }

  renderPosts(data) {
    return data.map( (data) => {
      return (
        <div>
          <span> <strong>{data.catName} ({data.catId}) {data.catDescription}</strong></span><br/>
          <span>
            {this.renderProducts(data.products)}
          </span>
        </div>
      );
    })


  }

  render() {

    const { data, loading, error } = this.props.categoriesProductsData;

    if (error) {
      return <div className="container"><h1>Products</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts(data)}
        </ul>
      </div>
    );
  }
}


export default Products;
