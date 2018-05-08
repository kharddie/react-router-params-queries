import React, { Component } from 'react';
import { Link } from "react-router";
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../actions/users';
import { connect } from "react-redux"
//import { connect } from "http2";


const mapDispatchToProps = (dispatch) => {
  return {
    loadUserFromToken: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') {//if there is no token, dont bother
        return;
      }

      //dispatch(meFromTokenSuccess(token))
      //fetch user from token (if server deems it's valid token)
      dispatch(meFromToken(token))
        .then((response) => {
          if (!response.error) { // network failure
            //check for server token failure 
            if (!response.payload.data.error) {
              sessionStorage.setItem('jwtToken', response.payload.data.token);
              dispatch(meFromTokenSuccess(response.payload.data))
            } else {
              sessionStorage.removeItem('jwtToken');
              dispatch(meFromTokenFailure(response.payload.data));
            }
          } else {
            sessionStorage.removeItem('jwtToken');
            dispatch(meFromTokenFailure(response.payload.data));
          }
        });

    },
    resetMe: () => {
      sessionStorage.removeItem('jwtToken');
      dispatch(resetToken());
    }
  }
}

const mapStateToProps = (state) => {
  profileUpdated: state.profileUpdated
}

class Layout extends React.Component {
  componentWillMount() {
    this.props.loadUserFromToken();
  }

  componentWillReceiveProps = (nextProps) => {
    this.props.location.pathname == "/"
  }
  render() {
    const { location, history } = this.props;
    const containerStyle = {
      marginTop: "40px"
    };

    const isHomePage = () => {
      if (location.pathname == "/") {
        return "isHomePage";
      } else {
        return "notHomePage";
      } isHomePage
    }

    return (
      <div className={isHomePage()}>
        <Nav location={location} history={history} />
        <div className="container main-content " style={containerStyle}>
          <div className="row">
            <div className="col col-12">
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default connect(null, mapDispatchToProps)(Layout)
