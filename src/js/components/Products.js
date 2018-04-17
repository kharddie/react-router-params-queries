import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CreateNewProductForm from "./CreateNewProductForm";

import CreateNewCategoriesForm from "./CreateNewCategoriesForm";


import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';


class Products extends React.Component {

  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
    //this.props.deleteProduct();
  }

  componentDidMount() {
    $(".updateProductForm").hide();
    $(".updateProductForm").hide();
  }

  componentDidUpdate() {
    $(".updateCategoriesForm").hide();
    $(".updateCategoriesForm").hide();
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
    modalvisibleProducts: false,
    modalvisibleCategories: false,
    numOfClicks: 0,
    selectedOption: '',
    productUpdatedName: '',
    productUpdatedId: '',
    isProductUpdateHidden: true
  }

  //modal
  showModalProduct = () => {
    this.setState({ modalvisibleProducts: true });
  }

  hideModal = () => {
    this.setState({ modalvisibleProducts: false });
    this.setState({ modalvisibleCategories: false });
  }


  showModalCategory = () => {
    this.setState({ modalvisibleCategories: true });
  }

  modalBackdropClicked = () => {
    this.setState({ modalvisibleProducts: false });
    this.setState({ modalvisibleCategories: false });
  }



  deleteObject = (action, event) => {
    if (action === 'product') {
      this.props.deleteProduct(event.prodId);
    }
    if (action === 'categories') {
      this.props.deleteCategories(event.prodId);
    }
  }

  showObjectUpdateView = (action, id) => {
    $(".updateThisProductForm" + id).toggle();
    $(".updateProductName" + id).toggle();

    $(".updateThisCategoriesForm" + id).toggle();
    $(".updateCategoriesName" + id).toggle();
  }

  handleObjectUpdate = (event) => {
    event.preventDefault();


    if (event.currentTarget.name === "updateProductForm") {
      let data = {
        name: event.target.updateName.value,
        id: event.target.updateName.id,
        category_id: event.target.updateCategoryId.id,
      }
      console.log(data)
      this.props.updateProduct(data);
      $(".updateProductName" + event.target.updateName.id).show();
      $(".updateThisProductForm" + event.target.updateName.id).hide()

    }

    if (event.currentTarget.name === "updateCategoriesForm") {
      let data = {
        name: event.target.updateName.value,
        description: event.target.updateCategoryDescription.value,
        id: event.target.updateName.id,
      }
      console.log(data)
      this.props.updateCategories(data);
      $(".updateCategoriesName" + event.target.updateName.id).show();
      $(".updateThisCategoriesForm" + event.target.updateName.id).hide()
    }
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
          <div>
            <div class="row text-left">
              <div class="col-12 col-sm-6">
                <span key={key} className={"updateProductName updateProductName" + data.prodId}> [{data.prodCategoryId}] ({data.prodName}) </span>

                <form name="updateProductForm" id={data.prodId} className={"updateProductForm updateThisProductForm" + data.prodId} onSubmit={this.handleObjectUpdate}>
                  <input id={data.prodId} key={"input1" + key} type="text" name="updateName" className="" defaultValue={data.prodName} />
                  <input id={data.prodCategoryId} key={"input2" + key} type="hidden" name="updateCategoryId" className="" />
                  <div class="spacer5"></div>
                  <button className="btn btn-primary" type="submit" >Update</button>
                </form>

              </div>
              <div class="col-6 col-xs-12 col-sm-2">
                <a className='btn' onClick={() => this.deleteObject('product', data)}><FontAwesomeIcon size="sm" icon={faTimes} /></a><span>&nbsp;&nbsp;&nbsp;</span>
                <a className='btn' onClick={() => this.showObjectUpdateView("categories", data.prodId)}><FontAwesomeIcon size="sm" icon={faEdit} /></a>
              </div>
            </div>
            <br />
          </div>
        );
      })
    }
  }

  renderPosts = (data) => {
    //console.log('From renderPosts()', this);
    return data.map((data, key) => {
      return (
        <div>
          <div class="card">
            <div class="card-header" id={"heading" + key}>
              <div class="row text-left">
                <div class="col-12 col-sm-6">




                  <button className={"accord btn btn-link collapsed no-text-wrap updateCategoriesName updateCategoriesName" + data.catId} data-toggle="collapse" data-target={"#collapse" + key} aria-expanded="false" aria-controls={"collapse" + key}>
                    {data.catName}[{data.products.length}] ({data.catId})<br /> {data.catDescription}
                  </button>
                  <form name="updateCategoriesForm" id={data.catId} className={"updateCategoriesForm updateThisCategoriesForm" + data.catId} onSubmit={this.handleObjectUpdate}>
                    <input id={data.catId} key={"input1" + key} type="text" name="updateName" className="" defaultValue={data.catName} />
                    <input key={"input2" + key} type="text" name="updateCategoryDescription" className="" defaultValue={data.catDescription} />
                    <div class="spacer5"></div>
                    <button className="btn btn-primary" type="submit" >Update</button>
                  </form>

                </div>
                <div class="col-6 col-xs-12 col-sm-2">
                  <a className='btn' onClick={() => this.deleteObject("categories", data)}><FontAwesomeIcon size="sm" icon={faTimes} /></a><span>&nbsp;&nbsp;&nbsp;</span>
                  <a className='btn' onClick={() => this.showObjectUpdateView("categories", data.catId)}><FontAwesomeIcon size="sm" icon={faEdit} /></a>
                </div>
              </div>
            </div>
            <div id={"collapse" + key} class="collapse" aria-labelledby={"heading" + key} data-parent="#accordion">
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

        <Modal visible={this.state.modalvisibleProducts} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-sm">
          <div className="modal-header">
            <h5 className="modal-title">Add new product</h5>
          </div>
          <div className="modal-body">
            <div class="container">
              <CreateNewProductForm reloadProducts={this.reloadProducts} props={this.props} hideModal={this.hideModal}></CreateNewProductForm>
            </div>
          </div>
          <div className="modal-footer"></div>
        </Modal>

        <Modal visible={this.state.modalvisibleCategories} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-sm">
          <div className="modal-header">
            <h5 className="modal-title">Create new category</h5>
          </div>
          <div className="modal-body">
            <div class="container">
              <CreateNewCategoriesForm reloadProducts={this.reloadProducts} props={this.props} hideModal={this.hideModal}></CreateNewCategoriesForm>
            </div>
          </div>
          <div className="modal-footer"></div>
        </Modal>


        <div className="row ">
          <div className="col-12 col-sm-3">Admin Dashboard</div>
          <div class="spacer5  col d-sm-none d-md-none d-lg-none"></div>
          <div className="col-12 col-sm-4 col-md-3"><button className="btn btn-primary" onClick={this.showModalProduct}>Create new Product</button></div>
          <div class="spacer5 col d-sm-none d-md-none d-lg-none"></div>
          <div className="col-12 col-sm-4 col-md-3"><button className="btn btn-secondary" onClick={this.showModalCategory}>Create new Category</button></div>
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
