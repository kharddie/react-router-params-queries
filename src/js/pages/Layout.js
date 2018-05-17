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
      this.props.getOrientation(this.getScreenDetailsRenderStles(false, "resize"));
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

  getScreenDetailsRenderStles = (execute, whoIs) => {
    this.setState({
      fitPageToScreen: "",
      IsHomePage: "not-home-page",
      fitPageToScreenOverflowHidden: ""
    });
    let windowInnerWidth = window.innerWidth;
    let windowInnerHeight = window.innerHeight;
    let contentContainerHeight = $(".content-container").outerHeight(true);
    let footerHeight = $(".footer").outerHeight(true);
    let getOrientation = windowInnerWidth > windowInnerHeight ? "Landscape" : "Portrait";
    let data = {
      windowInnerWidth: windowInnerWidth,
      windowInnerHeight: windowInnerHeight,
      contentContainerHeight: contentContainerHeight,
      footerHeight: footerHeight,
      getOrientation: getOrientation
    }

    console.log("---------------document ready-----------------");
    console.log("@@@@@whoIs==" + whoIs);
    console.log("@@@@@execute==" + execute);
    console.log("@@@@@content-container==" + data.contentContainerHeight);
    console.log("footer==" + data.footerHeight);
    console.log("window height=" + $(window).height());
    console.log("total==" + ($(".footer").outerHeight(true) + $(".content-container").outerHeight(true)));
    console.log((contentContainerHeight + footerHeight) > windowInnerHeight ? "dont apply" : "apply");
    console.log("---------------end document ready--------------------");

    if (execute) {
      if ((contentContainerHeight + footerHeight) >= windowInnerHeight) {
        this.setState({
          fitPageToScreen: "",
          IsHomePage: "not-home-page",
          fitPageToScreenOverflowHidden: ""
        });
      } else {
        this.setState({
          fitPageToScreen: "fit-page-to-Screen",
          IsHomePage: "not-home-page",
          fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden"
        });
      }
    } else {
      return data;
    }
  }

  componentDidMount() {
    this.props.loadUserFromToken();
    console.log("+++++++++++++++++++++++++++++++++  layout componentDidMount() ++++++++++++++++++++++++");
    let getScreenDetails = null;
    getScreenDetails = this.getScreenDetailsRenderStles(true, "componentDidMount");

    if (this.props.location.pathname === "/") {
      this.setState({
        showBackGroundImg: "show-backGround-img"
      });
    } else {
      showBackGroundImg: ""
    }
  }


  componentWillMount() {
    console.log("componentWillMount");
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log(nextProps.orientationType.getOrientation.data.getOrientation);
    let getScreenDetails = null;
    if (nextProps.location.pathname === "/") {
      this.setState({
        showBackGroundImg: "show-backGround-img"
      });
    } else {
      showBackGroundImg: ""
    }

    //change of state
    if (this.props.location.pathname != nextProps.location.pathname) {
      console.log("&&&&&&&&&&&&&&&&&&&&& change of state calling new dimentions current=" + this.props.location.pathname + "   to==" + nextProps.location.pathname);
      $(document).ready(() => {
        getScreenDetails = this.getScreenDetailsRenderStles(true, "location.pathname");

      })
    }

    //change of orientation
    if (this.props.orientationType.getOrientation.data) {
      if (this.props.orientationType.getOrientation.data.getOrientation != nextProps.orientationType.getOrientation.data.getOrientation) {
        console.log("Change of orientation");
        getScreenDetails = this.getScreenDetailsRenderStles(true, "change of orientation");
      }
    }

  };

  render() {
    const { location, history } = this.props;
    const containerStyle = {
      marginTop: "40px"
    };

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
