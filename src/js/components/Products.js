import React, { Component } from 'react';
import { Link } from 'react-router';

class Products extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }


  renderPosts(products) {
    if ("records" in products) {
      products = products.records;
      return products.map((product) => {
        return (
          <span>{product.category_name} ({product.category_id}) {product.description + product.price + product.description}</span>
        );
      });
    }

  }

  render() {
    const { products, loading, error } = this.props.productList;



    if (loading) {
      return <div className="container"><h1>Products</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts(products)}
        </ul>
      </div>
    );
  }
}


export default Products;
