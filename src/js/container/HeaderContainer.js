import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../actions/users';
import Header from '../components/header.js';




function mapStateToProps(state) {
  return { 
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user,
    sems: "nimimi"
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
 
     resetMe: () =>{
        dispatch(resetDeletedPost());
     },

     logout: () => {
         sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
