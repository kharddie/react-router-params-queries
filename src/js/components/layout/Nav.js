import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import { logoutUser } from '../../actions/users';
import { toTitleCase } from '../../helper/index.js';
import { resetUpdateProfileState } from '../../actions/updateProfile';
import { resetShowInfoMessage } from '../../actions/infoMessage'
import { resetUser } from '../../actions/users';


function mapStateToProps(state) {
  return {
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user,
    sems: "from nav class",
    newRequest: state.requests.newRequest,
    updateProfile: state.updateProfile,
    newOffer: state.offers.newOffer,
    infoMessage: state.infoMessage.infoMessage,
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

    resetUser: () => {
      dispatch(resetUser());
    },
    resetNewOffer: () => {
      dispatch(resetNewOffer());
    },
    resetShowInfoMessage: () => {
      dispatch(resetShowInfoMessage());
    }
  }
}

class Nav extends React.Component {

  state = {
    collapsed: true,
    hideLinks: false,
    renderInfoText: "",
    showInfoBox: "hide"
  }

  hideInfoBox = () => {
    $(".infoBox").hide(() => {
      this.setState({
        renderError: ""
      })
    });
  }

  showInfoBox = (text) => {
    $(".infoBox").show("slow", () => {
      this.setState({
        renderError: text
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log("---------this is from nav props --------------");
    //console.log(this.props);
    //console.log("---------this is from nav nextProps --------------");
    //console.log(nextProps);

    //sign in user
    if (this.props.user.user && !nextProps.user.user) { //If nextProps.user.user is true, return false. Otherwise return true.
      //this.props.history.push('/');
    }

    if (this.props.user.user && nextProps.user.user == null) {
      console.log("logout");
      //is.props.history.push('/signin');
    }


    if (nextProps.user.status === 'signin' && nextProps.user.message) {
      this.setState({
        renderInfoText: nextProps.user.message,
        showInfoBox: "show"
      })
      this.props.resetUser();
    }
    //this hides the info bar after successfule login
    if (nextProps.user.status === 'authenticated' && !nextProps.user.error) {
      this.setState({
        renderInfoText: '',
        showInfoBox: "hide"
      })
    }

    //log out user
    if (nextProps.user.status === 'logout') {
      this.props.history.push('/');
      this.props.resetUser();
    }


    //sign up user
   console.log(nextProps.infoMessage)
    if (nextProps.infoMessage.display && nextProps.user.status === 'signup') {
      this.setState({
        renderInfoText: nextProps.infoMessage.message,
        showInfoBox: "show"
      })
      this.props.resetShowInfoMessage();
      this.props.history.push('/');
    }


    //create offers  
    if (nextProps.newOffer.offer) {
      this.setState({
        renderInfoText: nextProps.newOffer.offer.message,
        showInfoBox: "show"
      })

    }


    /*reate
    if (nextProps.newRequest.request && !nextProps.newRequest.error) {
      //this.showInfoBox(nextProps.newRequest.request.message)
    }

    //show user messages
    if (nextProps.user.error) {
      //this.showInfoBox(nextProps.user.error)
    }
    //show update profile messages
    const { error, profileUpdated, message } = this.props.updateProfile;
    if (profileUpdated) {
      this.props.resetUpdateProfileState();
      this.showInfoBox(message);
    }

    //hide the info panel
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.hideInfoBox();
    }
    this.props.history.listen((location, action) => {
      //console.log(`The current URL is ${this.props.location.pathname}${this.props.location.search}${this.props.location.hash}`)
      //console.log(`The last navigation action was ${this.props.action}`)
    })
    */
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.setState({
      renderInfoText: "",
      showInfoBox: "hide"
    })
  }

  componentWillMount() {
    this.setState({
      renderInfoText: "",
      showInfoBox: "hide"
    })
  }

  toggleCollapse = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  renderSignInLinks(authenticatedUser) {
    if (authenticatedUser) {
      return (
        <ul className="nav  nav-pills navbar-right">
          <li class="nav-item dropdown" role="presentation">
            <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {toTitleCase(authenticatedUser.name)}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
              <Link class="dropdown-item" to={"myRequests/" + this.props.user.user.id} onClick={this.toggleCollapse.bind(this)}>View my requests</Link>
              <Link class="dropdown-item" to="profile" onClick={this.toggleCollapse.bind(this)}>View my profile</Link>
            </div>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-item nav-link" onClick={this.props.logout} href="javascript:void(0)">
              Log out
              </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav  nav-pills navbar-right">
        <li role="presentation" class="nav-item">
          <Link class="dropdown-item" role="presentation" to="/signup">
            Sign up
            </Link>
        </li>
        <li role="presentation" class="nav-item">
          <Link class="dropdown-item" to="/signin">
            Sign in
            </Link>
        </li>
      </ul>
    );
  }

  renderLinks(authenticatedUser, signInClass, aboutUsClass, settingsClass, dashboardClass, signUpClass, createRequestClass, myRequestsClass, browseRequestsClass, profileClass) {
    if (authenticatedUser) {
      return (
        <ul class="navbar-nav mr-auto">
          <li class={"nav-item " + signInClass}>
            <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
          </li>

          <li class={"nav-item " + aboutUsClass}>
            <Link class="nav-link" to="aboutUs" onClick={this.toggleCollapse.bind(this)}>AboutUs</Link>
          </li>
          <li class={"nav-item " + createRequestClass} >
            <Link class="nav-link" to="createRequest" onClick={this.toggleCollapse.bind(this)}>Create a Request</Link>
          </li>

          <li class={"nav-item " + browseRequestsClass} >
            <Link class="nav-link" to="browseRequests" onClick={this.toggleCollapse.bind(this)}>Browse request</Link>
          </li>

          <li class={"nav-item " + settingsClass}>
            <Link class="nav-link" to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
          </li>

          <li class={"nav-item " + dashboardClass}>
            <Link class="nav-link" to="dashboard" onClick={this.toggleCollapse.bind(this)}>Dashboard</Link>
          </li>
        </ul>
      );
    }

    return (
      <ul class="navbar-nav mr-auto">
        <li class={"nav-item " + signInClass}>
          <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
        </li>

        <li class={"nav-item " + aboutUsClass}>
          <Link class="nav-link" to="aboutUs" onClick={this.toggleCollapse.bind(this)}>AboutUs</Link>
        </li>

        <li class={"nav-item " + signInClass} >
          <IndexLink class="nav-link" to="/signin" onClick={this.toggleCollapse.bind(this)}>Login</IndexLink>
        </li>
        <li class={"nav-item " + createRequestClass} >
          <Link class="nav-link" to="createRequest" onClick={this.toggleCollapse.bind(this)}>Create a Request</Link>
        </li>

        <li class={"nav-item " + browseRequestsClass} >
          <Link class="nav-link" to="browseRequests" onClick={this.toggleCollapse.bind(this)}>Browse request</Link>
        </li>


        <li class={"nav-item " + settingsClass}>
          <Link class="nav-link" to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
        </li>

        <li class={"nav-item " + dashboardClass}>
          <Link class="nav-link" to="dashboard" onClick={this.toggleCollapse.bind(this)}>Dashboard</Link>
        </li>
        <li class={"nav-item " + signUpClass} >
          <Link class="nav-link" to="signup" onClick={this.toggleCollapse.bind(this)}>Signup</Link>
        </li>
      </ul>
    );
  }

  render() {
    const { authenticatedUser, newRequest } = this.props;

    //this.showHideUserLinks(authenticatedUser);

    const { location } = this.props;
    const { collapsed } = this.state;
    const signInClass = location.pathname === "/" ? "active" : "";
    const aboutUsClass = location.pathname.match(/^\/aboutUs/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const createRequestClass = location.pathname.match(/^\/createRequest/) ? "active" : "";
    const myRequestsClass = location.pathname.match(/^\/myRequests/) ? "active" : "";
    const browseRequestsClass = location.pathname.match(/^\/browsRequests/) ? "active" : "";
    const dashboardClass = location.pathname.match(/^\/dashboard/) ? "active" : "";
    const signUpClass = location.pathname.match(/^\/signUp/) ? "active" : "";
    const profileClass = location.pathname.match(/^\/profile/) ? "active" : "";


    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
        <div className="header">
          <nav class="navbar navbar-expand-lg navbar-light" role="navigation">
            <a class="navbar-brand" href="#">Logo</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class={"collapse navbar-collapse " + navClass} id="navbarSupportedContent">
              {this.renderLinks(authenticatedUser, signInClass, aboutUsClass, settingsClass, dashboardClass, signUpClass, myRequestsClass, browseRequestsClass)}
              <span className="navbar-text">
                {this.renderSignInLinks(authenticatedUser)}
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