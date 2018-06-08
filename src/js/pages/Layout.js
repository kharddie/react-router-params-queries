import React, { Component } from 'react';
import { Link } from "react-router";
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../actions/users';
import { fetchRequests, resetRequest, fetchRequestsSuccess, fetchRequestsFailure } from '../actions/requests';
import { connect } from "react-redux";
import { fetchOrientation } from "../actions/getOrientation"
//import { connect } from "http2";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import ResizeSensor from 'resize-sensor--react';
import 'resize-sensor--react/build/resize-sensor.css';
import Hand from '../components/hand';


const mapDispatchToProps = (dispatch, ownProps) => {
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
              dispatch(meFromTokenSuccess(response.payload.data));

              //get requests for user when on update request page in case the page is reloaded 
              if (ownProps.location.pathname.indexOf("createRequest") > -1 || ownProps.location.pathname.indexOf("myRequestsDetails") > -1 && ownProps.params.hasOwnProperty("requestId")) {
                let myRequests = "myRequests";
                dispatch(fetchRequests(response.payload.data.token, parseInt(response.payload.data.data.user.id), myRequests)).then((response) => {
                  !response.error ? dispatch(fetchRequestsSuccess(response.payload.data)) : dispatch(fetchRequestsFailure(response.payload));
                });
              }
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
    /*
        function onElementHeightChange(elm, callback){
          var lastHeight = elm.clientHeight, newHeight;
          (function run(){
            newHeight = elm.clientHeight;
            if( lastHeight != newHeight )
              callback();
            lastHeight = newHeight;
        
                if( elm.onElementHeightChangeTimer )
                  clearTimeout(elm.onElementHeightChangeTimer);
        
            elm.onElementHeightChangeTimer = setTimeout(run, 200);
          })();
        }
        
        onElementHeightChange(document.body, function(){
          alert('Body height changed');
        });
    
        */
  }

  state = {
    getOrientation: null,
    locationPathname: null,
    showBackGroundImg: "",
    fitPageToScreen: "",
    IsHomePage: "not-home-page",
    fitPageToScreenOverflowHidden: "",
    isPlay: true
  }

  play = () => {
    this.setState({ isPlay: true });
  }

  getScreenDetailsRenderStyles = (w, h) => {
    let windowInnerWidth = window.innerWidth;
    let windowInnerHeight = window.innerHeight;
    let contentContainerHeight = h;
    let footerHeight = $(".footer").outerHeight(true);
    let getOrientation = windowInnerWidth > windowInnerHeight ? "Landscape" : "Portrait";

    if (contentContainerHeight > windowInnerHeight) {
      console.log("@@@@@ cc=" + contentContainerHeight + " > wh=" + windowInnerHeight + " ::remove");
      //$(".main-content").css("padding-bottom", "50px");
      this.setState({
        fitPageToScreen: "",
        IsHomePage: "not-home-page",
        fitPageToScreenOverflowHidden: "",
      });
    } else if (contentContainerHeight == windowInnerHeight) {
      console.log("@@@@@ cc=" + contentContainerHeight + " == wh=" + windowInnerHeight + " ::applied");
      this.setState({
        fitPageToScreen: "fit-page-to-Screen",
        IsHomePage: "not-home-page",
        fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden",
      });

    } else if (contentContainerHeight < windowInnerHeight) {
      console.log("@@@@@ cc=" + contentContainerHeight + " < wh=" + windowInnerHeight + " ::apply");
      this.setState({
        fitPageToScreen: "fit-page-to-Screen",
        IsHomePage: "not-home-page",
        fitPageToScreenOverflowHidden: "fit-page-to-screen-overflow-hidden",
      });
    }
  }

  componentDidMount() {
    //on reload
    this.props.loadUserFromToken();

    if (this.props.location.pathname === "/") {
      this.setState({
        showBackGroundImg: "show-backGround-img"
      });
    } else {
      showBackGroundImg: ""
    }

  }


  componentWillMount() {
    // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
    // this.props.history.listen((location) => {
    // view new URL
    //   console.log('New URL', location.pathname);
    //  });
  }

  componentWillReceiveProps = (nextProps) => {

    let getScreenDetails = null;

    if (nextProps.location.pathname === "/") {
      this.setState({
        showBackGroundImg: "show-backGround-img"
      });
    } else {
      this.setState({
        showBackGroundImg: ""
      });
    }


  };

  render() {
    const { location, history, params } = this.props;
    const containerStyle = {
      marginTop: "40px"
    };

    return (
      <div className={this.state.showBackGroundImg + " " + this.state.fitPageToScreenOverflowHidden}>
        <div class={"content-container " + this.state.fitPageToScreen}>
          <ResizeSensor
            onResize={
              (w, h) => {
                this.getScreenDetailsRenderStyles(w, h)
              }
            }
          />
          <Nav location={location} history={history} params={params} />

          <div className="main-content-holder">
            <div id="main-content" className=" main-content container " style={containerStyle}>
              <div className="row">
                <div className="col col-12">
                  {this.props.children}
                </div>
              </div>
            </div>
            <div className="hand-animation" >
              <button onClick={this.play}>Play</button>
              <Hand isPlay={this.state.isPlay} onComplete={this.resetPlay} /></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
