import React, { Component } from 'react';
import { Link } from 'react-router';

class MyRequests extends Component {
  componentWillMount() {
    this.props.fetchRequests(this.props.user);
  }

  componentWillReceive() {
    this.props.fetchRequests(this.props.user);
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
          <div key={index}>
            <div className="row">
              <div className="col-sm-12"><Link to={"myRequestsDetails/" + request.id} href="#">{request.title}</Link></div>
            </div>
            <div className="row justify-content-left">
              <div className="col-sm-4">
                <a onClick={()=> {this.deleteRequest(request.id)}}><img className="svg-icon svg-icon-smaller svg-icon-margin-right" src="../../images/delete.svg" alt="X" /></a>
                <Link to={"createRequest/" + request.id} ><img className="svg-icon svg-icon-smaller" src="../../images/edit.svg" alt="Update" /></Link>
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
    } else if (requestsList.error) {
      return <div className="alert alert-danger">Error: {requestsList.message}</div>
    }

    return (
      <div>
        <h2>My requests</h2>

        {this.renderRequests(requestsList.requests)}

      </div>
    );
  }
}

export default MyRequests;
