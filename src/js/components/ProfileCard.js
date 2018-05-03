import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends React.Component {
  editProfileView = () => {
      $('.carousel').carousel(1);

  }
  render() {
    let user = this.props.user.user;


    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div><h2 className="text-lowercase font-weight-bold">{user && user.name}<span className="userName text-lowercase">{user && user.user_name}</span></h2></div>



            <div className="row">
              <div className="col-sm-12 col-lg-4"> Contact number:</div>
              <div className="col-sm-12 col-lg-6 text-left font-weight-bold">{user && user.contact_number}</div>
            </div>



            <div class="row">
              <div class="col-sm-12 col-lg-4">Email:</div>
              <div class="col-sm-12 col-lg-6 text-left font-weight-bold">{user && user.email}</div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-lg-4">Address:</div>
              <div class="col-sm-12 col-lg-6 text-left font-weight-bold">{user && user.address}
              <button  onClick={this.editProfileView} className="btn btn-secondary btn-sm"> Add </button>
              </div>
            </div>

 


          </div>
        </div>
      </div>
    );
  }
}
