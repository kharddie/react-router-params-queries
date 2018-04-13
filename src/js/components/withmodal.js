import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CreateNewProductForm from "./CreateNewProductForm";



class Products extends React.Component {

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
    modalvisible: false,
    numOfClicks: 0,
    selectedOption: ''
  }

 
  //modal
  showModal = () => {
    this.setState({ modalvisible: true });
  }

  hideModal = () => {
    this.setState({ modalvisible: false });
  }

  deleteProduct = (event) => {
    this.props.deleteProduct(event.prodId);
    //this.setState({numOfClicks: this.state.numOfClicks + 1});
  }
  //end modal

  //select component
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.value}`);
  }

  createProduct = (e) => {
    e.preventDefault();
    const productName = e.target.elements.productName.value;
    const categoryId = this.state.selectedOption.value;
    this.props.createProduct(categoryId,productName);
  }

  //end select component




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

    const { categoriesDetails, productsDetails, errorLoading, deletedProductDetails } = this.props.dataToProps;
    var productsArr = [];
    const categoriesProductsArr = [];

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    //Get categories for select
    const catOptions = categoriesDetails.data.map(data => {
      return { value: data.id, label: data.name }
    })

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

        <button className="btn btn-primary" onClick={this.showModal}>Show modal</button>
        <Modal visible={this.state.modalvisible} onClickBackdrop={this.modalBackdropClicked}>
        <form onSubmit={this.createProduct}>
          <div className="modal-header">
            <h5 className="modal-title">Create new category</h5>
          </div>
          <div className="modal-body">
            <div class="container">




              
                <div class="row">
                  <div class="col">Choose product category</div>
                </div>
                <div class="row">
                  <div class="col">
                    <Select
                      name="form-field-name"
                      value={value}
                      onChange={this.handleChange}
                      options={catOptions}
                    /></div>
                </div>
                <div class="row">
                
                  <div class="col">
                    <input type="text" name="productName" placeholder="Product name..." />
                  </div>
                  
                </div>
             





            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" type="submit">Create product</button>
            <button type="button" className="btn btn-primary" onClick={this.hideModal}>
              close
          </button>
          </div>
          </form>
        </Modal>

        <CreateNewProductForm props = {this.props}></CreateNewProductForm>






























        <ul className="list-group">
          {this.renderPosts(categoriesProductsArr)}
        </ul>
      </div>
    );
  }
}

export default Products;
