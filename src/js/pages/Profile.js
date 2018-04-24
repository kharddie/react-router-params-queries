import React, { Component } from 'react';
import UpdateEmailFormContainer from '../containers/UpdateEmailFormContainer.js';
import ProfileCardContainer from '../containers/ProfileCardContainer.js';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="container">
     
        	<div className='well'>
        		<ProfileCardContainer />
        	</div>
        	<div className='well'>
        		<UpdateEmailFormContainer />
        	</div>
        	
        </div>
      </div>
    );
  }
}


export default Profile;
