import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import HeaderContainer from "../../container/HeaderContainer.js"

function mapStateToProps(state) {
  return { 
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user,
    sems: "from nav class"
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
 
  }
}

class Nav extends React.Component {

  state = {
    collapsed: true,
  }
  componentWillReceiveProps(nextProps) {
    console.log("this is from nav class");
    console.log(this.props);
  }

  toggleCollapse = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  showHideUserLinks=(authenticatedUser) =>{
    if(authenticatedUser) {
      console.log("hidelog in button")
    }
  }

  render() {
    const { authenticatedUser }  = this.props;
    this.showHideUserLinks(authenticatedUser);
    const { location } = this.props;
    const { collapsed } = this.state;
    const signInClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";

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
            <ul class="navbar-nav mr-auto">
              <li class={"nav-item " + signInClass}>
                <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li class={"nav-item " + signInClass}>
                <IndexLink class="nav-link" to="/signin" onClick={this.toggleCollapse.bind(this)}>Login</IndexLink>
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
              <li class={"nav-item " + signUpClass}>
                <Link class="nav-link" to="signup" onClick={this.toggleCollapse.bind(this)}>Signup</Link>
              </li>
            </ul>

            <span className="navbar-text">
              <HeaderContainer />
            </span>
          </div>

        </nav>

      </div>

    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);