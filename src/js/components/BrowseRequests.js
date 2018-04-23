import React, { Component } from 'react';
import { Link } from 'react-router';
import Moment from 'moment'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';



class BrowseRequests extends Component {
    componentWillMount() {
        this.props.fetchRequests();
    }

    getRequestsTotal(requests) {
        if (requests.hasOwnProperty("data")) {
            return (
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <a className="btn btn-secondary btn-request" >{requests.data.length} NEW REQUESTS</a>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
    }

    renderRequests(requests) {
        if (requests.hasOwnProperty("data")) {
            return requests.data.map((data, index) => {
                return (
                    <div className="row" key={index} >
                        <div className="col request-box">
                            <div className="row" >
                                <div className="col-12 text-right">
                                    <ul class="dropdown-menu">
                                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a></li>
                                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Delete</a></li>
                                        <li class="divider"></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-12 title">{data.title}</div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-xs-12 col-sm-9">
                                    <div><FontAwesomeIcon className="fa-right" size="sm" icon={faMapMarker} />{data.address}</div>
                                    <div><FontAwesomeIcon className="fa-right" size="sm" icon={faCalendar} />{Moment("2018-04-16T14:00:00.000Z").format('d MMM YYYY')}</div>
                                </div>
                                <div className="col-12 col-xs-12 col-sm-3">
                                    <FontAwesomeIcon className="" size="lg" icon={faUser} />
                                </div>
                            </div>

                            <div className="row footer" >
                                <div className="col-12 col-md-8 tiny-text">
                                    <div className="row" >
                                        <div className="col-12 col-sm-4"><span className="request-status">{data.status}</span></div>
                                    </div>
                                </div>
                            </div>
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

                {this.getRequestsTotal(requests)}

                <div class="row">
                    <div class="col-md-4">
                        {this.renderRequests(requests)}
                    </div>

                    <div class="col-md-8">
                        <div className="row" >
                            <div className="col-12 request-box request-box-details">
                                <div className="row" >
                                    <div className="col-12 text-right">
                                        <ul class="dropdown-menu">
                                            <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a></li>
                                            <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Delete</a></li>
                                            <li class="divider"></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-xs-12 col-sm-8">
                                        <div className="row" >
                                            <div className="col-12 col-xs-12 col-sm-7">
                                                <div className="row tiny-text" >
                                                    <div className="col "><span className="request-status request-status-open">Open</span></div>
                                                    <div className="col "><span className="request-status request-status-assigned">Assigned</span></div>
                                                    <div className="col "><span className="request-status request-status-completed">Completed</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div className="col-12 title">Colect deliveries from post office and drop off</div>
                                        </div>

                                        <div className="row" >
                                            <div className="col-sm-1"><FontAwesomeIcon className="" size="lg" icon={faUser} /></div>
                                            <div className="col-sm-11">REQUEST MADE BY </div>
                                        </div>
                                        <div className="row" >
                                            <div className="col-sm-1"><FontAwesomeIcon className="fa-right" size="sm" icon={faMapMarker} /></div>
                                            <div className="col-sm-11">data.address</div>
                                        </div>

                                        <div className="row" >
                                            <div className="col-sm-1"><FontAwesomeIcon className="fa-right" size="sm" icon={faCalendar} /></div>
                                            <div className="col-sm-11">2018-04-16T14:00:00.000Z</div>
                                        </div>





                                    </div>
                                    <div className="col-12 col-xs-12 col-sm-4 col-xs-12 text-center">
                                        <div className="payment-panel">
                                            <div>REQUEST BUDGET</div>
                                            <div>$50</div>
                                            <div><button type="button" class="btn btn-success">Offer to assist</button></div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 content">I want the double bed&mattress and two bedside table to be delivered at Caulfield South from Murrumbeena twelve minutes drive</div>
                                </div>
                                <div className="row footer" >
                                    <div className="col-12 col-md-8 tiny-text">
                                        fooooooooooter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <p>Google maps</p>
                    </div>

                </div>

            </div>
        );
    }
}


export default BrowseRequests;


