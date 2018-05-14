import React, { Component } from 'react';
import { Link } from "react-router";
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../actions/users';
import { connect } from "react-redux"
//import { connect } from "http2";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";


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

    const pageFitScreen = () => {
      if (location.pathname == "/" || location.pathname == "/browseRequests") {
        return "app-bg-image page-fit-screen-fit ";
      }

      else if (location.pathname == "/forgotPwd" || location.pathname == "/resetPwd" ) {
        if (isMobile) {
          return "notHomePage";
        } else {
          return "app-bg-image page-fit-screen-fit ";
        }
      }

      else if ( location.pathname == "/signUp") {
        if (isMobile) {
          return "notHomePage";
        } else {
          return "app-bg-image app-bg-image-height-auto";
        }
      }

      /* 
       else if (location.pathname == "/browseRequests") {
         if (isMobile) {
           return "notHomePage";
         } else {
           return "app-bg-image page-fit-screen-fit ";
         }
       } 
       */
      else {
        return "notHomePage";
      }
    }

    const pageFitScreen2 = () => {
      if (location.pathname == "/" || location.pathname == "/browseRequests") {
        return "content-container-fit-screen";
      }

      else if (location.pathname == "/forgotPwd" || location.pathname == "/resetPwd" ) {
        if (isMobile) {
          return "notHomePage";
        } else {
          return "content-container-fit-screen";
        }
      }
      /*else if (location.pathname == "/browseRequests") {
        if (isMobile) {
          return "notHomePage";
        } else {
          return "content-container-fit-screen";
        }
      } 
      */else {
        return "notHomePage";
      }
    }

    return (
      <div className={pageFitScreen()}>
        <div class={"content-container " + pageFitScreen2()}>
          <Nav location={location} history={history} />
          <div className="container main-content " style={containerStyle}>
            <div className="row">
              <div className="col col-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default connect(null, mapDispatchToProps)(Layout)
