import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment'
import Moment from 'react-moment';
import Modal from 'react-bootstrap4-modal';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendar from '@fortawesome/fontawesome-free-solid/faCalendar';
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import CreateOfferContainer from '../containers/CreateOfferContainer.js';
import GoogleMapReact from 'google-map-react';

class BrowseRequests extends Component {
    componentWillMount() {
        this.props.fetchRequests();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newOffer.offer){
            this.setState({ modalvisible: false });
            this.props.resetNewOffer();
        }
    }

    state = {
        modalvisibleProducts: false,
        title: '',
        address: '',
        content: '',
        created: '',
        due_date: '',
        request_id: '',
        modified: '',
        name: '',
        status: '',

    }

    modalBackdropClicked = () => {
        this.setState({ modalvisible: false });
    }

    showModal = () => {
        this.setState({ modalvisible: true });
    }

    requestDetails = (data) => {
        console.log(data);
        this.setState({
            title: data.title,
            address: data.address,
            content: data.content,
            created: data.created,
            due_date: data.due_date,
            request_id: data.id,
            modified: data.modified,
            name: data.name,
            status: data.status,
        })
    }

    getRequestsTotal(requests) {
        if (requests.hasOwnProperty("data")) {
            return (
                <div className="row">
                    <div className="col col-md-3">
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

    toggleImg() {
        let img1 = "../../../images/down-arrow.svg",
            img2 = "../../../images/down-arrow.svg";
        $('#arrow').toggleClass("arrow-down", "arrow-up");
    }

    timeSpan = (time, moment) => {
        let a = moment(time);
        let b = moment();
        return a.from(b);
    }

    renderRequests(requests) {
        if (requests.hasOwnProperty("data")) {
            return requests.data.map((data, index) => {
                return (
                    <div className="row" key={index} onClick={() => this.requestDetails(data)} >
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
                                <div className="col-9">
                                    <div><FontAwesomeIcon className="fa-right" size="sm" icon={faMapMarker} />{data.address}</div>
                                    <div><FontAwesomeIcon className="fa-right" size="sm" icon={faCalendar} />{moment(data.due_date).format('d MMM YYYY')}</div>
                                    <div className="more-info-btn">
                                        <a class="btn  more-details arrow-down" onclick={() => this.toggleImg()} data-toggle="collapse" data-target={"#mf-" + index}>
                                            <img src="../../../images/down-arrow.svg" id="arrow" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <img class="user-image" src="../../images/user.svg" alt="" />
                                </div>
                            </div>
                            <div className="row more-info">
                                <div className="col-12 col-xs-12">

                                    <div id={"mf-" + index} class="collapse">
                                        <div className="row">
                                            <div className="col-12">
                                                <span class="text-uppercase font-weight-bold">Details<br /></span>
                                                {data.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row footer" >
                                <div className="col-12 col-md-8 tiny-text">
                                    <span className="request-status">{data.status}</span>
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

        $(document).ready(function () {
            $('.carousel').carousel({
                interval: false
            })
        });

        if (loading) {
            $(".loader-spinner-container").removeClass("loader-hide")
            $(".loader-spinner-container").addClass("loader-show")
            console.log("loading")
        } else {
            $(".loader-spinner-container").removeClass("loader-show")
            $(".loader-spinner-container").addClass("loader-hide")
            console.log("finished loading")
        }

        if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        return (
            <div className="container requests">
                {this.getRequestsTotal(requests)}
                <div class="row">
                    <div className="col-md-4 scrollable-content requests-small">
                        <div className="loader-show loader-spinner-container">
                            <FontAwesomeIcon size="lg" className="fa-spin spinner" icon={faSpinner} />
                        </div>
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
                                            <div className="col col-12 title">{this.state.title}</div>
                                        </div>

                                        <div className="row" >
                                            <div className="col col-sm-2">
                                                <img class="user-image" src="../../images/user.svg" alt="" />
                                            </div>
                                            <div className="col col-sm-6 col-padding-left-0 text-uppercase font-weight-bold">Posted by: <br /><span class="text-capitalize"><span class="font-weight-normal">{this.state.name}</span></span></div>
                                            <div className="col col-sm-4 text-right"><br /><span class="text-capitalize font-weight-normal">{this.timeSpan(this.state.created, moment)}.</span></div>
                                        </div>

                                        <div className="row separator" >
                                            <div class="col col-sm-2"></div>
                                            <div class="col col-sm-10 col-padding-left-0"></div>
                                        </div>

                                        <div className="row" >
                                            <div className="col-sm-2"><img class="icon-image" src="../../images/placeholder.svg" alt="" /></div>
                                            <div className="col-sm-10 col-padding-left-0"><span class="text-uppercase font-weight-bold">Address</span><br />{this.state.address}</div>
                                        </div>
                                        <div className="row separator" >
                                            <div class="col col-sm-2"></div>
                                            <div class="col col-sm-10 col-padding-left-0"></div>
                                        </div>

                                        <div className="row" >
                                            <div className="col-sm-2 "><img class="icon-image" src="../../images/calendar.svg" alt="" /></div>
                                            <div className="col-sm-10 col-padding-left-0"><span class="text-uppercase font-weight-bold">Due date</span><br />{moment(this.state.due_date).format('d MMM YYYY')}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xs-12 col-sm-4 col-xs-12 text-center">
                                        <div className="payment-panel">
                                            <div class="header text-uppercase">REQUEST BUDGET</div>
                                            <div class="amount text-uppercase">$50</div>
                                            <div><button type="button" class="btn btn-success" onClick={this.showModal}>Offer to assist</button></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 content">
                                        <span class="text-uppercase font-weight-bold">Details<br /></span>
                                        {this.state.content}
                                    </div>
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
                <Modal visible={this.state.modalvisible} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-md">
                    <div className="modal-header">
                        <div className="container">
                            <div className="row">
                                <div className="col text-left"> <h5 className="modal-title">Create a request</h5></div>
                                <div className="col text-right">
                                    <button type="button" class="close" onClick={this.modalBackdropClicked} data-dismiss="alert">&times;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div><CreateOfferContainer requestId={this.state.request_id} location={location} history={history} /></div>
                                    </div>
                                    <div className="carousel-item">
                                        <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                                    </div>
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
                    <div className="modal-footer"></div>
                </Modal>
            </div>
        );
    }
}


export default BrowseRequests;


