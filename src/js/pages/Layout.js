import React, { Component } from 'react';
import { Link } from "react-router";
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../actions/users';
import { connect } from "react-redux";
import { fetchOrientation } from "../actions/getOrientation"
//import { connect } from "http2";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";


const mapDispatchToProps = (dispatch) => {
  return {
    loadUserFromToken: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') {//if there is no token, dont bother
        return;
      }
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
    },
    getOrientation: (getOrientation) => {
      dispatch(fetchOrientation(getOrientation));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orientationType: state.getOrientation
  }
}

class Layout extends Component {
  constructor(props) {
    super(props);
    $(window).resize(() => {
      let getOrientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
      props.getOrientation(getOrientation);
    });




  }

  state = {
    getOrientation: null,
    locationPathname: null,
    showBackGroundImg: "",
    fitPageToScreen: "",
    IsHomePage: "",
    fitPageToScreenOverflowHidden: ""
  }

  componentDidMount() {

  }

  componentWillMount() {
    this.props.loadUserFromToken();
    let getOrientation;
    getOrientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
    this.props.getOrientation(getOrientation);
    $(window).resize(() => {
      getOrientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
      this.props.getOrientation(getOrientation);
    });


  }

  componentWillReceiveProps = (nextProps) => {
    //orientation: nextProps.orientationType,
    console.log(nextProps.orientationType.getOrientation.data);
    console.log(nextProps.location.pathname);

    if (nextProps.location.pathname == "/") {
      if (nextProps.orientationType.getOrientation.data === "Portrait") {
        this.setState({
          showBackGroundImg: "show-backGround-img",
          fitPageToScreen: "fit-page-to-Screen",
          IsHomePage: "home-page",
          fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
        });
      }
      else if (nextProps.orientationType.getOrientation.data === "Landscape") {
        if (isMobile) {
          if ($(window).width() > 768) {  ///ipad
            this.setState({
              showBackGroundImg: "show-backGround-img",
              fitPageToScreen: "fit-page-to-Screen",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
            });
          } else {
            this.setState({
              showBackGroundImg: "show-backGround-img",
              fitPageToScreen: "",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: ""
            });
          }
        } else { ////desktops
          this.setState({
            showBackGroundImg: "show-backGround-img",
            fitPageToScreen: "fit-page-to-Screen",
            IsHomePage: "home-page",
            fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
          });
        }
      }
    }
    else if (nextProps.location.pathname == "/browseRequests" || nextProps.location.pathname == "/forgotPwd" || nextProps.location.pathname == "/resetPwd" || nextProps.location.pathname == "/forgotPwd" || nextProps.location.pathname == "/signIn") {
      if (nextProps.orientationType.getOrientation.data === "Portrait") {
        this.setState({
          showBackGroundImg: "",
          fitPageToScreen: "fit-page-to-Screen",
          IsHomePage: "home-page",
          fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
        });
      } else if (nextProps.orientationType.getOrientation.data === "Landscape") {
        if (isMobile) {
          if ($(window).width() > 768) {  ///ipad
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "fit-page-to-Screen",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
            });
          } else {
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "",
              IsHomePage: "not-home-page",
              fitPageToScreenOverflowHidden: ""
            });

          }
        }
        else { /////smaller phones
          this.setState({
            showBackGroundImg: "",
            fitPageToScreen: "fit-page-to-Screen",
            IsHomePage: "home-page",
            fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
          });
        }
      }
    }
    else { ///all other pages

      if (nextProps.orientationType.getOrientation.data === "Landscape") {
        if (isMobile) {
          if ($(window).width() > 768) {///ipad
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "fit-page-to-Screen",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
            });
          } else { ///////smaller phones
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "",
              IsHomePage: "not-home-page",
              fitPageToScreenOverflowHidden: ""
            });

          }
        }
        else { ////desktops
          //check for smaller heighst
          if ($(".content-container").height() < 532) {
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "fit-page-to-Screen",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
            });

          } else {///////bigger heights
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "",
              IsHomePage: "not-home-page",
              fitPageToScreenOverflowHidden: ""
            });
          }
        }
      }
      else if (nextProps.orientationType.getOrientation.data === "Portrait") { 
        if (isMobile) {
          if ($(window).width() > 768) {///ipad
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "fit-page-to-Screen",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
            });
          } else { ///////smaller phones
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "",
              IsHomePage: "not-home-page",
              fitPageToScreenOverflowHidden: ""
            });

          }
        }
        else { ////desktops
          //check for smaller heighst
          if ($(".content-container").height() < 532) {
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "fit-page-to-Screen",
              IsHomePage: "home-page",
              fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
            });

          } else {///////bigger heights
            this.setState({
              showBackGroundImg: "",
              fitPageToScreen: "",
              IsHomePage: "not-home-page",
              fitPageToScreenOverflowHidden: ""
            });
          }
        }
      }
    }
  }













  render() {
    const { location, history } = this.props;
    const containerStyle = {
      marginTop: "40px"
    };

    $(document).ready(function () {
      /*var observer = new MutationObserver(function(mutations) {
        alert('size changed!');
      });
      var target = document.querySelector('#main-content');
      observer.observe(target, {
        attributes: true, 
        childList: true, 
        characterData: true 
      });
      */
    });


    return (
      <div className={this.state.showBackGroundImg + " " + this.state.fitPageToScreenOverflowHidden}>
        <div class={"content-container " + this.state.fitPageToScreen}>
          <Nav location={location} history={history} />
          <div id="main-content" className=" main-content container " style={containerStyle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
