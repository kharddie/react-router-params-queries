import React, { Component } from 'react';
import { connect } from 'react-redux';
import AcceptOffer from '../components/AcceptOffer';


const mapStateToProps = (state) => {
  return { 
    user: state.user
  };
}

export default connect(mapStateToProps)(AcceptOffer);
