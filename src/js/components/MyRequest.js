import React, { Component } from 'react';
import { Link } from 'react-router';

class MyRequest extends Component {
  componentWillMount() {
    //this.props.fetchRequests();
  }

  renderCategories(categories) {
     return categories.map((c) => {
        c = c.trim();
        return (
          <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
        );
     });
  }

  renderRequests(requests) {
    return requests.map((post) => {
      return (
        <li className="list-group-item" key={post._id}>
          <Link style={{color:'black'}} to={"requests/" + post._id}>
            <h3 className="list-group-item-heading">{post.title}</h3>
          </Link>
            {this.renderCategories(post.categories)}
        </li>
      );
    });
  }

  render() {
    const { requests, loading, error } = this.props.requestsList;

    if(loading) {
      return <div className="container"><h1>Requests</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Requests</h1>
        <ul className="list-group">
          
        </ul>
      </div>
    );
  }
}


export default MyRequest;
