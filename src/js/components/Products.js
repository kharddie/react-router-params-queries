import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CreateNewProductForm from "./CreateNewProductForm";


import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';






const element = (
  <FontAwesomeIcon icon={faTimes} />
)




class Products extends React.Component {

  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
    //this.props.deleteProduct();
  }

  reloadProducts() {
    this.props.fetchProducts();
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
  showModalProduct = () => {
    this.setState({ modalvisible: true });
  }
  showModalCategory = () => {
    //
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
    // this.props.createProduct(categoryId,productName);
  }

  //end select component




  renderProducts = (data) => {
    if (data.length > 0) {
      return data.map((data, key) => {
        //console.log('From renderProducts()', this);
        return (
          <span>
            <span key={key}> [{data.prodCategoryId}] ({data.prodName})
            </span>
            <a className='btn' onClick={() => this.deleteProduct(data)}>delete</a>

            <FontAwesomeIcon size="lg" icon={faTimes} /><FontAwesomeIcon size="lg" icon={faEdit} />

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
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed no-text-wrap" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  {data.catName} ({data.catId})<br /> {data.catDescription}
                </button>




              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body">
                {this.renderProducts(data.products)}
              </div>
            </div>
          </div>
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
      <div>
        <h1>DashBoard</h1>


        <Modal visible={this.state.modalvisible} onClickBackdrop={this.modalBackdropClicked}>
          <div className="modal-header">
            <h5 className="modal-title">Create new category</h5>
          </div>
          <div className="modal-body">
            <div class="container">
              <CreateNewProductForm reloadProducts={this.reloadProducts} props={this.props} hideModal={this.hideModal}></CreateNewProductForm>
            </div>
          </div>
          <div className="modal-footer"></div>
        </Modal>



        <div className="row ">
          <div className="col-12 col-sm-3">Admin Dashboard</div>
          <div class="spacer5  col d-sm-none d-md-none d-lg-none"></div>
          <div className="col-12 col-sm-4 col-md-3"><button className="btn btn-primary" onClick={this.showModalProduct}>Create new Category</button></div>
          <div class="spacer5 col d-sm-none d-md-none d-lg-none"></div>
          <div className="col-12 col-sm-4 col-md-3"><button className="btn btn-secondary" onClick={this.showModalCategory}>Create new product</button></div>
        </div>
        <div class="spacer5"></div>
        <div id="accordion">
          {this.renderPosts(categoriesProductsArr)}
        </div>
      </div>
    );
  }
}

export default Products;
