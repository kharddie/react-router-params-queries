import React, { Component } from 'react';
import SignUpFormContainer from '../containers/signUpFormContainer.js';

class SignUp extends Component {
  render() {
    const { location, history } = this.props;
    return (
      <div>
        <SignUpFormContainer location={location} history={history}/>
      </div>
    );
  }
}


export default SignUp;
