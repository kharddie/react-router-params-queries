import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import { logoutUser } from '../../actions/users';
import { toTitleCase } from '../../helper/index.js';
import { resetUpdateProfileState } from '../../actions/updateProfile';
import { resetShowInfoMessage } from '../../actions/infoMessage'
import { resetUser } from '../../actions/users';
import { resetForgotPwdEmail, resetForgotPwdReset } from '../../actions/forgotPwdEmail';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { fetchRequests, resetRequest, fetchRequestsSuccess, fetchRequestsFailure } from '../../actions/requests';

function mapStateToProps(state) {
  return {
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user,
    sems: "from nav class",
    newRequest: state.requests.newRequest,
    updateProfile: state.updateProfile,
    newOffer: state.offers.newOffer,
    acceptOffer: state.offers.acceptOffer,
    infoMessage: state.infoMessage.infoMessage,
    forgotPwd: state.forgotPwd,
    requestsList: state.requests.requestsList,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetMe: () => {
      dispatch(resetDeletedPost());
    },
    logout: () => {
      sessionStorage.removeItem('jwtToken');
      dispatch(logoutUser());
    },
    resetUpdateProfileState: () => {
      dispatch(resetUpdateProfileState())
    },
    resetRequest: () => {
      dispatch(resetRequest());
    },

    resetUser: () => {
      dispatch(resetUser());
    },
    resetNewOffer: () => {
      dispatch(resetNewOffer());
    },
    resetShowInfoMessage: () => {
      dispatch(resetShowInfoMessage());
    },
    resetForgotPwdEmail: () => {
      dispatch(resetForgotPwdEmail());
    },
    resetForgotPwdReset: () => {
      dispatch(resetForgotPwdReset());
    },
  }
}

class Nav extends React.Component {

  constructor(props) {
    super(props);

  }

  clearshowInfoBox = () => {
    if (!global.retainInfoMsg) {
      this.hideInfoBox();
      this.setState({
        renderInfoText: '',
        showInfoBox: "hide"
      })
    } else {
      this.showInfoBox();
      global.retainInfoMsg = false;
    }
  }

  state = {
    collapsed: true,
    hideLinks: false,
    renderInfoText: "",
    showInfoBox: "hide",
    isAthenticatedUser: false
  }

  hideInfoBox = () => {
    //$(".infoBox").hide();
  }

  showInfoBox = () => {
    // $(".infoBox").show();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("---------this is from nav props --------------");
    //console.log(this.props);
    //console.log("---------this is from nav nextProps --------------");
    //console.log(nextProps);
    /*
        if (nextProps.infoMessage.message) {
          this.setState({
            renderInfoText: nextProps.infoMessage.message,
            showInfoBox: "show"
          })
        }
    */

    //get requests
    //console.log(nextProps.infoMessage)
    if (nextProps.requestsList.error === 'error') {
      this.setState({
        renderInfoText: nextProps.requestsList.message,
        showInfoBox: "show"
      })
      this.props.resetRequest();
      this.props.history.push('/createRequest');
    }
    if (this.props.requestsList.message == null && nextProps.requestsList.message === "success") {
      this.setState({
        renderInfoText: "",
        showInfoBox: "hide"
      })
    }

    //forgot password email message
    if (nextProps.forgotPwd.forgotPwdEmail.message) {
      this.setState({
        renderInfoText: nextProps.forgotPwd.forgotPwdEmail.message,
        showInfoBox: "show"
      })
      this.props.resetForgotPwdEmail();
    }

    //reset password
    if (nextProps.forgotPwd.resetEmail.message) {
      this.setState({
        renderInfoText: nextProps.forgotPwd.resetEmail.message,
        showInfoBox: "show"
      })
      this.props.resetForgotPwdReset();
    }

    if (this.props.user.user && nextProps.user.user == null) {
      console.log("logout");
      //is.props.history.push('/signin');
    }

    //sign in user
    if (this.props.user.user && !nextProps.user.user) { //If nextProps.user.user is true, return false. Otherwise return true.
      //this.props.history.push('/');
    }

    if (nextProps) {
      if (nextProps.user.status === 'signin' && nextProps.user.error === 'error') {
        this.setState({
          renderInfoText: nextProps.user.message,
          showInfoBox: "show"
        })
        this.props.resetUser();
      } else if (this.props.user.status === 'signin' && !this.props.user.error) {
        this.setState({
          renderInfoText: "",
          showInfoBox: "hide"
        })
      }
    }

    //log out user
    if (nextProps.user.status === 'logout') {
      this.props.history.push('/');
      this.props.resetUser();
    }

    //sign up user
    //console.log(nextProps.infoMessage)
    if (nextProps.infoMessage.display && nextProps.user.status === 'signup') {
      this.setState({
        renderInfoText: nextProps.infoMessage.message,
        showInfoBox: "show"
      })
      this.props.resetShowInfoMessage();
      global.retainInfoMsg = true;
      this.props.history.push('/');
    }

    //accept offer
    if (nextProps.infoMessage.display && nextProps.acceptOffer.acceptOffer) {
      this.setState({
        renderInfoText: nextProps.acceptOffer.acceptOffer.message,
        showInfoBox: "show"
      })
      this.props.resetShowInfoMessage();
    }

    //create offers  
    if (nextProps.newOffer.offer) {
      this.showInfoBox();
      this.setState({
        renderInfoText: nextProps.newOffer.offer.message,
        showInfoBox: "show"
      })

    }

  }

  componentWillUnmount() {
    //console.log("*** componentWillUnmount");
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT

  }

  componentDidMount() {
    //console.log("*** componentDidMount");

  }

  componentWillMount() {
    //console.log("*** componentWillMount");
  }

  toggleCollapse = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  renderSignInLinks(authenticatedUser, signInClass, signUpClass) {
    if (authenticatedUser) {
      return (
        <ul className="nav  nav-pills navbar-right">
          <li class="nav-item dropdown user-profile" role="presentation">
            <a class="nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="nav-image-icon"><img class="user-image" src="../../images/user-profile.svg" alt="" /></span>
              {toTitleCase(authenticatedUser.name)}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
              <Link class="dropdown-item" to={"myRequests/" + this.props.user.user.id} onClick={this.toggleCollapse.bind(this)}>View My Requests</Link>
              <Link class="dropdown-item" to="profile" onClick={this.toggleCollapse.bind(this)}>View My Profile</Link>
            </div>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-item nav-link log-out" onClick={this.props.logout} href="javascript:void(0)">
              Log out
              </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav  nav-pills navbar-right only-big-screen">
        <li role="presentation" class={"pres  nav-item " + signUpClass}>
          <Link class="dropdown-item nav-link" role="presentation" to="/signUp">
            Sign up
            </Link>
        </li>
        <li role="presentation" class={"pres  nav-item " + signInClass}>
          <Link class="dropdown-item nav-link" to="/signIn">
            Sign in
            </Link>
        </li>
      </ul>
    );
  }

  renderLinks(authenticatedUser, showLogin, homeClass, signInClass, aboutUsClass, settingsClass, dashboardClass, signUpClass, createRequestClass, myRequestsClass, browseRequestsClass, profileClass) {
    if (authenticatedUser) {
      return (
        <ul class="navbar-nav mr-auto">
          <li class={"nav-item " + homeClass}>
            <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>
              <span className="nav-image-icon"><img class="user-image" src="../../images/home.svg" alt="" /></span>
              <span>Home</span>
            </IndexLink>
          </li>

          <li class={"nav-item " + aboutUsClass}>
            <Link class="nav-link" to="aboutUs" onClick={this.toggleCollapse.bind(this)}>
              <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/logo.svg" alt="" /></span>
              About Us</Link>
          </li>
          <li class={"nav-item " + createRequestClass} >
            <Link class="nav-link" to="createRequest" onClick={this.toggleCollapse.bind(this)}>
              <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/plus.svg" alt="" /></span>
              Create a Request</Link>
          </li>
          <li class={"nav-item " + browseRequestsClass} >
            <Link class="nav-link" to="browseRequests" onClick={this.toggleCollapse.bind(this)}>
              <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/search.svg" alt="" /></span>
              Browse Request</Link>
          </li>
          <li class="dropdown nav-item only-small-screen">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span className="nav-image-icon"><img class="user-image" src="../../images/user-profile.svg" alt="" /></span>
              {toTitleCase(authenticatedUser.name)} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li className="nav-item" >
                <Link class="dropdown-item" to={"myRequests/" + this.props.user.user.id} onClick={this.toggleCollapse.bind(this)}>View my requests
                </Link>
              </li>
              <li className="nav-item">
                <Link class="dropdown-item" to="profile" onClick={this.toggleCollapse.bind(this)}>View My Profile
                </Link></li>
              <li className="nav-item">
                <a class="dropdown-item log-out" onClick={this.props.logout} href="javascript:void(0)">
                  Log out
              </a>
              </li>
            </ul>
          </li>
        </ul>
      );
    }

    return (
      <ul class="navbar-nav mr-auto">
        <li class={"ddd nav-item " + homeClass}>
          <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>
            <span className="nav-image-icon"><img class="user-image" src="../../images/home.svg" alt="" /></span>
            <span>Home</span>
          </IndexLink>
        </li>
        <li class={"ddd nav-item " + aboutUsClass}>
          <Link class="nav-link" to="aboutUs" onClick={this.toggleCollapse.bind(this)}>
            <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/logo.svg" alt="" /></span>
            About Us</Link>
        </li>
        <li class={"nav-item " + browseRequestsClass} >
          <Link class="nav-link" to="browseRequests" onClick={this.toggleCollapse.bind(this)}>
            <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/search.svg" alt="" /></span>
            Browse Request</Link>
        </li>
        <li class={"nav-item hide" + dashboardClass}>
          <Link class="nav-link " to="dashboard" onClick={this.toggleCollapse.bind(this)}>Dashboard</Link>
        </li>
        <li class={"nav-item only-mobile " + showLogin()} >
          <Link class="nav-link" to="signIn" onClick={this.toggleCollapse.bind(this)}>{!authenticatedUser}
            <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/sign-in.svg" alt="" /></span>
            Sign In</Link>
        </li>
        <li class={"nav-item only-mobile " + showLogin()} >
          <Link class="nav-link" to="signUp" onClick={this.toggleCollapse.bind(this)}>
            <span className="nav-image-icon nav-image-icon-mobile"><img class="user-image" src="../../images/sign-up.svg" alt="" /></span>
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { authenticatedUser, newRequest } = this.props;
    const showLogin = () => {
      if (!authenticatedUser) {
        return "show"
      } else {
        return "hide"
      }

      this.props.history.listen((location, action) => {
        console.log("navigation detect=" + global.retainInfoMsg)
        this.clearshowInfoBox();
      });
    }

    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? "active" : "";
    const signInClass = location.pathname.match(/^\/signIn/) ? "active" : "";
    const aboutUsClass = location.pathname.match(/^\/aboutUs/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const createRequestClass = location.pathname.match(/^\/createRequest/) ? "active" : "";
    const myRequestsClass = location.pathname.match(/^\/myRequests/) ? "active" : "";
    const browseRequestsClass = location.pathname.match(/^\/browseRequests/) ? "active" : "";
    const dashboardClass = location.pathname.match(/^\/dashboard/) ? "active" : "";
    const signUpClass = location.pathname.match(/^\/signUp/) ? "active" : "";
    const profileClass = location.pathname.match(/^\/profile/) ? "active" : "";


    const navClass = collapsed ? "collapse" : "";

    $(function () {
      $('.navbar>a,a.log-out').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
    });

    return (
      <div>
        <div className="header">
          <nav class="navbar navbar-expand-lg navbar-light" role="navigation">
            <a class="navbar-brand" href="#"><span className="logo-span"><img class="user-image" src="../../images/logo.svg" alt="" /></span></a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class={"collapse navbar-collapse " + navClass} id="navbarSupportedContent">
              {this.renderLinks(authenticatedUser, showLogin, homeClass, signInClass, aboutUsClass, settingsClass, dashboardClass, signUpClass, createRequestClass, myRequestsClass, browseRequestsClass, profileClass)}
              <span className="navbar-text">
                {this.renderSignInLinks(authenticatedUser, signInClass, signUpClass)}
              </span>
            </div>
          </nav>
        </div>
        <div class={"container alert-success infoBox " + this.state.showInfoBox}>
          <div className="row">
            <div className="col-12 text-center">
              <div class="alert alert-successalert-success" role="alert">
                {this.state.renderInfoText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);