import React, { Component } from 'react';
import { Link } from 'react-router';
//import Moment from 'react-moment';

class BrowseRequests extends Component {
    componentWillMount() {
        this.props.fetchRequests();
    }



    renderRequests(requests) {
        if (requests.hasOwnProperty("data")) {
            return requests.data.map((data, index) => {
                return (
                    <div key={index}>
                        <div className="row" >
                            <div className="col-12 col-sm-6"><h2>data.title</h2></div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-xs-12 col-sm-2">
                                <h2>data.address</h2>
                                <h2>data.due_date</h2>
                            </div>
                            <div className="col-6 col-xs-12 col-sm-2"><h2>picha</h2></div>
                        </div>
                    </div>
                )


            })
        }

    }

    render() {
        const { requests, loading, error } = this.props.requestsList;

        if (loading) {
            return <div className="container"><h1>Requests</h1><h3>Loading...</h3></div>
        } else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        return (
            <div className="container">
                <h1>Requests</h1>
                <h2></h2>
                {this.renderRequests(requests)}
            </div>
        );
    }
}


export default BrowseRequests;


