import React, { Component } from 'react';
import UpdateProfileFormContainer from '../containers/UpdateProfileFormContainer.js';
import ProfileCardContainer from '../containers/ProfileCardContainer.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';

class Profile extends Component {
  render() {
    $(document).ready(function () {
      $('.carousel').carousel({
        interval: false
      })
    });
    return (
      <div className="container">
          <div class="row justify-content-md-center">
            <div class="col-sm-12 col-md-6 text-right">
              <div class="row justify-content-md-right">
                <div class="col-6 col-sm-6 text-left">
                  <h2>Profile</h2>
                </div>
                <div class="col-6 col-sm-6 ">
                  <ol className="carousel-indicators custom">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"><FontAwesomeIcon size="sm" icon={faUser} /></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"><FontAwesomeIcon size="sm" icon={faEdit} /></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
            <div className="row justify-content-md-center">
              <div className="col-sm-12 col-md-6">
                <div className="profile">
                  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div>	<ProfileCardContainer /></div>
                      </div>
                      <div className="carousel-item">
                        <UpdateProfileFormContainer />       </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
































        </div>
      </div>
    );
  }
}


export default Profile;
