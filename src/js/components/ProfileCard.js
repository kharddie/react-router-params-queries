import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends Component {

  render() {
    let user = this.props.user.user;
    return (
      <div>
          <div className="row">
            <div className="col-sm-12">
                <div>Name: {user && user.name}</div>
                <div>Username: {user && user.user_name}</div>
                <div>Email: {user && user.email}</div>
            </div>
          </div>
      </div>
    );
  }
}
