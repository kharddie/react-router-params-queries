import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends React.Component {
  editProfileView = () => {
    $('.carousel').carousel(1);

  }
  render() {
    let user = this.props.user.user;
    let style = '';
    let address = '';
    if (user && user.address) {
      style = 'hide';
      address = user.address;
    } else {
      style = 'show';

    }



    return (
      <div>
        <div className="row profile-card">
          <div className="col-sm-12">
            <div><h2 className="text-lowercase font-weight-bold">{user && user.name}<span className="userName text-lowercase font-weight-normal">{user && user.user_name}</span></h2></div>
            <div className="row">
              <div className="col-12 separator"></div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-4"> Contact number:</div>
              <div className="col-sm-12 col-lg-6 text-left font-weight-normal">{user && user.contact_number}</div>
            </div>
            <div className="row">
              <div className="col-12 separator"></div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-lg-4">Email:</div>
              <div class="col-sm-12 col-lg-6 text-left font-weight-normal">{user && user.email}</div>
            </div>
            <div className="row">
              <div className="col-12 separator"></div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-lg-4">Address:</div>
              <div class="col-sm-12 col-lg-6 text-left font-weight-normal">
                {address}
                <button onClick={this.editProfileView} className={"btn btn-secondary btn-sm " + style}><span className="img" ><img src="../images/add.svg" /></span> </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
