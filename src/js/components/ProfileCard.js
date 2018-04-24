import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends Component {

  render() {
    let user = this.props.user.user;
    return (
      <div>


        <div className='container'>
          <div className="row justify-content-md-center">
            <div className={"col-sm-12 col-md-6"}>
              <div className="profile">
                <h2>Profile</h2>
                <div>Name: {user && user.name}</div>
                <div>Username: {user && user.username}</div>
                <div>Email: {user && user.email}</div>
              </div>
            </div>
          </div>
        </div>














      </div>
    );
  }
}
