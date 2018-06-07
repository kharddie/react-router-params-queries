import React, { Component } from 'react';
import { Link } from 'react-router';

class MyRequests extends Component {
  componentWillMount() {
    this.props.fetchRequests(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.requestsList.requests)
  }

  renderRequestsx(requests) {
    if (requests.length > 0)
      return requests.map((request, index) => {
        return (
          <div className="dropdown" key={index}>
            <button className="btn btn-link request-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {request.title}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Delete</a>
              <Link to={"createRequest/" + request.id} className="dropdown-item" href="#">Update</Link>
              <Link to={"myRequestsDetails/" + request.id} className="dropdown-item" href="#">View Details</Link>
            </div>
          </div>
        );
      })
  }

  deleteRequest = (id) => {
    this.props.deleteRequest(id);
  }

  renderRequests(requests) {
    if (requests.length > 0)
      return requests.map((request, index) => {
        return (
          <div className="zebra-row" key={index}>
            <div className="row">
              <div className="col-xs-12 col-sm-7 col-md-8">
                <Link to={"myRequestsDetails/" + request.id} href="#">{request.title}</Link>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-4 text-right justify-content-left">
                <a className="inline-block svg-icon-margin-right cursor-pointer" onClick={() => { this.deleteRequest(request.id) }}><img className="svg-mid-width svg-icon-smaller " src="../../images/delete.svg" alt="X" /></a>
                <Link to={"createRequest/" + request.id} ><img className="svg-icon svg-mid-width svg-icon-smaller" src="../../images/edit.svg" alt="Update" /></Link>
              </div>
            </div>
          </div>
        );
      })
  }

  render() {

    const { user, requestsList } = this.props;
    if (requestsList.loading) {
      return <div className="container"><h1>Requests</h1><h3>Loading...</h3></div>
    } else if (requestsList.loading) {
      return <div className="alert alert-danger">Error: {requestsList.message}</div>
    }

    return (
      <div className="profile-container">
        <h2>My requests</h2>

        <div className={requestsList.requests.length === 0 ? "show zebra" : "hide"}>
          You do not not have any request. Please post a <Link to="/createRequest" >request,</Link> or offer to <Link to="/browseRequests" >assist</Link>. 
        </div>

        <div className="zebra">
          {this.renderRequests(requestsList.requests)}
        </div>
      </div >
    );
  }
}

export default MyRequests;
