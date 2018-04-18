import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    console.log("............inside headerjs=" + this.props);
    console.log(this.props);
   if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
     // this.props.history.push('/');
    }
  }

  renderSignInLinks(authenticatedUser) {
    if(authenticatedUser) {
      return (
        <ul className="nav  nav-pills navbar-right">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link role="presentation" style={{color:'#996633',  fontSize: '17px'}} to="/profile">
              {authenticatedUser.name}
              </Link>
            </li>
            <li style={{paddingRight: '10px'}} role="presentation">      
              <a style={{color:'#996633',  fontSize: '17px'}}  onClick={this.props.logout} href="javascript:void(0)">
              Log out
              </a>
            </li>
        </ul>
      );
    }

    return (
      <ul className="nav  nav-pills navbar-right">
          <li style={{paddingRight: '10px'}} role="presentation">      
            <Link  role="presentation" style={{color:'#996633',  fontSize: '17px'}} to="/signup">
            Sign up
            </Link>
          </li>
          <li style={{paddingRight: '10px'}} role="presentation">      
            <Link style={{color:'#996633',  fontSize: '17px'}} to="/signin">
            Sign in
            </Link>
          </li>
      </ul>
   );
  }
  
	render() {
    const { authenticatedUser } = this.props;
			return (
			 <div>
			      {this.renderSignInLinks(authenticatedUser)}   
			 </div>				
			);
	}
}

export default Header