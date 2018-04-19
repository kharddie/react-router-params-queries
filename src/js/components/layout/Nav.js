import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import { logoutUser } from '../../actions/users';


function mapStateToProps(state) {
  return {
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user,
    sems: "from nav class"
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
    }
  }
}

class Nav extends React.Component {

  state = {
    collapsed: true,
    hideLinks: false
  }
  componentWillReceiveProps(nextProps) {
    console.log("this is from nav class");
    console.log(this.props);
    if (this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      // this.props.history.push('/');
    }
  }
  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  toggleCollapse = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  showHideUserLinks = (authenticatedUser) => {
    if (authenticatedUser) {
      // this.setState({
      // hideLinks: true,
      // });
    }
  }

  renderSignInLinks(authenticatedUser) {
    if (authenticatedUser) {
      return (
        <ul className="nav  nav-pills navbar-right">
          <li style={{ paddingRight: '10px' }} role="presentation">
            <Link role="presentation" style={{ color: '#996633', fontSize: '17px' }} to="/profile">
              {authenticatedUser.name}
            </Link>
          </li>
          <li style={{ paddingRight: '10px' }} role="presentation">
            <a style={{ color: '#996633', fontSize: '17px' }} onClick={this.props.logout} href="javascript:void(0)">
              Log out
              </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav  nav-pills navbar-right">
        <li style={{ paddingRight: '10px' }} role="presentation">
          <Link role="presentation" style={{ color: '#996633', fontSize: '17px' }} to="/signup">
            Sign up
            </Link>
        </li>
        <li style={{ paddingRight: '10px' }} role="presentation">
          <Link style={{ color: '#996633', fontSize: '17px' }} to="/signin">
            Sign in
            </Link>
        </li>
      </ul>
    );
  }

  renderLinks(authenticatedUser, signInClass, archivesClass, settingsClass, dashboardClass, signUpClass, requestClass, myRequestsClass, browsRequestsClass) {
    if (authenticatedUser) {
      return (
        <ul class="navbar-nav mr-auto">
          <li class={"nav-item " + signInClass}>
            <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
          </li>
          <li class={"nav-item " + requestClass} >
            <Link class="nav-link" to="request" onClick={this.toggleCollapse.bind(this)}>Create a Request</Link>
          </li>
          <li class={"nav-item " + myRequestsClass} >
            <Link class="nav-link" to="myRequests" onClick={this.toggleCollapse.bind(this)}>View my requests</Link>
          </li>
          <li class={"nav-item " + browsRequestsClass} >
            <Link class="nav-link" to="browsRequests" onClick={this.toggleCollapse.bind(this)}>Browse request</Link>
          </li>
          <li class={"nav-item " + archivesClass}>
            <Link class="nav-link" to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
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
        <li class={"nav-item " + signInClass} >
          <IndexLink class="nav-link" to="/signin" onClick={this.toggleCollapse.bind(this)}>Login</IndexLink>
        </li>
        <li class={"nav-item " + requestClass} >
          <Link class="nav-link" to="request" onClick={this.toggleCollapse.bind(this)}>Create a Request</Link>
        </li>
        <li class={"nav-item " + myRequestsClass} >
          <Link class="nav-link" to="myRequests" onClick={this.toggleCollapse.bind(this)}>View my requests</Link>
        </li>
        <li class={"nav-item " + browsRequestsClass} >
          <Link class="nav-link" to="browsRequests" onClick={this.toggleCollapse.bind(this)}>Browse request</Link>
        </li>

        <li class={"nav-item " + archivesClass}>
          <Link class="nav-link" to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
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
    const { authenticatedUser } = this.props;

    //this.showHideUserLinks(authenticatedUser);

    const { location } = this.props;
    const { collapsed } = this.state;
    const signInClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const requestClass = location.pathname.match(/^\/Request/) ? "active" : "";
    const myRequestsClass = location.pathname.match(/^\/myRequests/) ? "active" : "";
    const browsRequestsClass = location.pathname.match(/^\/browsRequests/) ? "active" : "";
    const dashboardClass = location.pathname.match(/^\/dashboard/) ? "active" : "";
    const signUpClass = location.pathname.match(/^\/signUp/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
          <a class="navbar-brand" href="#">Logo</a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class={"collapse navbar-collapse " + navClass} id="navbarSupportedContent">
            {this.renderLinks(authenticatedUser, signInClass, archivesClass, settingsClass, dashboardClass, signUpClass, myRequestsClass, browsRequestsClass)}
            <span className="navbar-text">
              {this.renderSignInLinks(authenticatedUser)}
            </span>
          </div>

        </nav>

      </div>

    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);