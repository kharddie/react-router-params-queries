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
import CreateCommentForm from '../containers/CreateCommentFormContainer.js';
import GoogleApiWrapper from './MapContainer';
import Geocode from "react-geocode";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import SignInFormContainer from '../containers/SignInFormContainer.js';
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCSGUZtwqI8T3N-_qBhy8iJ6AEyrtuTqls");
import { toTitleCase } from '../helper/index.js';
import renderHTML from 'react-render-html';


// Enable or disable logs. Its optional.
Geocode.enableDebug();

class BrowseRequests extends Component {
    constructor(props) {
        super(props);
        this.props.history.listen((location, action) => {
            //this.props.resetRequest();
            this.props.fetchRequests();
        });
    }
    componentWillMount() {
        console.log("componentWillMount");
        this.props.fetchRequests();

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        //update request status to assigned 
        if (nextProps.requestToBeUpdated) {
            this.setState({
                status: nextProps.requestToBeUpdated.status
            })
            this.props.resetAcceptedOffer();
        }

        // console.log(nextProps.requestsList.requests)
        // console.log(nextProps.resetRequestxx.message)

        if (nextProps.newOffer.offer) {
            this.setState({ 
                modalvisibleOffers: false,
                modalvisibleLikeHomePage:false 
            });
            this.props.resetNewOffer();
        }

        //accept offer
        if (!nextProps.acceptedOffer.loading) {
            this.setState({
                showOffersAScceptBtn: true
            })
        } else if (nextProps.acceptedOffer.loading) {
            this.setState({
                showOffersAScceptBtn: false
            })
        }
    }

    state = {
        modalvisibleProducts: false,
        modalvisibleOffers: false,
        modalvisibleSignIn: false,
        title: '',
        address: '',
        content: '',
        created: '',
        due_date: '',
        request_id: '',
        modified: '',
        name: '',
        user_id: '',
        status: '',
        showGoogleMap: "show",
        showRequestDetails: "hide",
        showOffersAScceptBtn: true,
        showOfferModal: true,
        requestBoxDetailsCol: 'col-lg-8',
        requestsSmallCol: 'col-lg-4',
        modalvisibleLikeHomePage: false,
        origin: "",

    }

    modalBackdropClicked = () => {
        this.setState({ modalvisibleOffers: false });
        this.setState({ modalvisibleSignIn: false });
        this.setState({ modalvisibleLikeHomePage: false });
    }

    modalvisibleOffers = () => {
        this.setState({ origin: "offersModal" });
        if (this.state.status !== "Assigned" || this.state.status !== "Completed" && (this.state.showOfferModal)) {
            this.setState({ modalvisibleOffers: true });
        }
    }
    modalvisibleSignIn = () => {
        this.setState({ origin: "signInModalClose" });
        this.setState({ modalvisibleSignIn: true });
    }

    modalvisibleLikeHomePage = () => {
        this.setState({ origin: "signInModalDontClose" });
        this.setState({ modalvisibleLikeHomePage: true });
    }



    scrollableContentHeight = () => {
        this.setState(
            {
                requestBoxDetailsCol: 'col-lg-8',
                requestsSmallCol: 'col-lg-4'
            }
        )
        if (isMobile) {
            $(".scrollable-content").show();
            $(".request-box-details").hide();
            $(".scrollableContentHeight-btn").hide();


        }
    }

    displayRequestDetails = (data) => {
        if (isMobile) {
            if ($(window).width() < 1024) {
                $(".scrollable-content").hide();
            } else {
                $(".scrollable-content").show();
            }

            $(".request-box-details").show();
            $(".scrollableContentHeight-btn").show();
            $(".scrollableContentHeight-btn-holder").show();
        }


        this.setState(
            {
                //  requestBoxDetailsCol: 'col-lg-12',
                //  requestsSmallCol: 'col-lg-12'
            }
        )


        // disabled if its the user that created the request
        if (!this.props.user) {
            $(".offer-to-assist").attr("disabled", "disabled");
            this.setState({ showOfferModal: false })
        } else if (this.props.user && this.props.user.id === data.user_id) {
            $(".offer-to-assist").attr("disabled", "disabled");
            this.setState({ showOfferModal: false })
        } else if (this.props.user && this.props.user.id !== data.user_id) {
            $(".offer-to-assist").prop("disabled", false)
            this.setState({ showOfferModal: true })
        } else {
            $(".offer-to-assist").prop("disabled", false)
            this.setState({ showOfferModal: true })
        }
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
            user_id: data.user_id,
            status: data.status,
            showGoogleMap: "hide",
            showRequestDetails: "show",
        })

        //Querry the database for this request offers  made and comments
        this.props.fetchOffers(data.id);
        this.props.fetchComments(data.id);
        this.props.acceptedOfferList()
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

    showModalWhichPos = () => {
        if (this.props.user.id) {
            $('.carouselCheckLogin').carousel(1);
        } else {
            $('.carouselCheckLogin').carousel(0);
        }
    }

    toggleImg(event) {
        event.stopPropagation();

        if ($('.more-details').hasClass("collapsed")) {
            console.log("collapsed");
            $('.more-details img').removeClass("arrow-up");
            $('.more-details img').addClass("arrow-down");
        } else {
            console.log("not collapsed");
            $('.more-details img').removeClass("arrow-down");
            $('.more-details img').addClass("arrow-up");

        }
    }

    timeSpan = (time, moment) => {
        let a = moment(time);
        let b = moment();
        return a.from(b);
    }

    renderOffers = (offers, acceptedOffer, user) => {
        let showAcceptedOffer = false;
        let showAcceptedOfferView = false;
        if (offers.length > 0) {
            return offers.map((data, index) => {
                showAcceptedOffer = false;
                showAcceptedOfferView = false;
                if (user) {
                    // hide the accept view if this logged in user did not create this request so they cant accept offers
                    if (this.state.user_id !== user.id) {
                        showAcceptedOfferView = false;
                    } else {
                        showAcceptedOfferView = true;
                    }

                    if (data.isOfferAccepted) {
                        showAcceptedOffer = true;
                    } else {
                        showAcceptedOffer = false;
                    }

                    /* if (data.whos_accepted_this === user.id) {
                         showAcceptedOffer = true;
                     } else {
                         showAcceptedOffer = false;
                     }
                     */
                }

                return (
                    <div className="row" key={index}>
                        <div className="col-12 col-xs-12">
                            <div className="row" >
                                <div className="col-sm-2 col-max-width-fifty"><img className="user-image" src="../../images/user.svg" alt="" /></div>
                                <div className="col-sm-3 "><span className="text-uppercase font-weight-bold titles">{data.user_name}</span></div>
                                <div className="col-sm-2 "><span className="text-uppercase font-weight-bold"><span className="star"><img className="" src="../../images/star.svg" alt="" /></span></span></div>
                                <div className="col-sm-3 "><span className="text-uppercase text-uppercase font-weight-normal  tiny-text">{this.timeSpan(data.created, moment)}</span></div>
                                <div className="col-sm-2 ">
                                    <span className={showAcceptedOfferView ? "show text-uppercase font-weight-normal" : "hide text-uppercase font-weight-normal"}>


                                        <button className={!showAcceptedOffer ? "show btn btn-link btn-sm btn-img" : "hide btn btn-link btn-sm"} onClick={() => { this.props.acceptOffer(data.offer_id, this.state.request_id, this.state.user_id, this.props.user.id) }}>
                                            Accept offer
                                        </button>
                                        <span className={showAcceptedOffer ? "show" : "hide"}><img className="accepted-offer-tick" src="../../images/checked.svg" alt="" /></span>




                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 separator"></div>
                    </div>
                )
            })

        }
    }

    goToSingInPage = () => {
        this.props.history.push('/signin');
    }

    renderComments = (comments) => {
        //this.props.resetComments(); 
        if (comments.length > 0) {
            return comments.map((data, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="col-12 col-xs-12">
                            <div className="row" >
                                <div className="col-sm-1 "><img className="user-image" src="../../images/user.svg" alt="" /></div>
                                <div className="col-sm-11 ">
                                    <span className="text-uppercase font-weight-bold titles">{data.user_name}</span>
                                    <div>{renderHTML(data.content)}</div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-sm-1"></div>
                                <div className="col-sm-11 ">
                                    <span className="comments-span-top"></span>
                                    <span className="text-uppercase font-weight-normal font-italic tiny-text">{this.timeSpan(data.created, moment)}</span></div>
                            </div>
                        </div>
                        <div className="col-12 separator"></div>
                    </div>
                )
            })
        }
    }

    renderRequests(requests) {
        global.points = [];
        //  if (requests.hasOwnProperty("data")) {
        if (requests.length > 0) {
            return requests.map((data, index) => {
                if (data.title != '' && data.address != '' && data.content != '' && data.status) {
                    //get lat long from address
                    
                                         Geocode.fromAddress(data.address).then(
                                             response => {
                                                 const { lat, lng } = response.results[0].geometry.location;
                                                 //console.log(lat, lng);
                                                 global.points.push(
                                                     { lat: lat, lng: lng, title: data.title, body: data.content, address: data.address }
                                                 )
                                             },
                                             error => {
                                                 console.error(error);
                                             }
                                         )
                                         

                    return (
                        <div className="row" key={index} onClick={() => this.displayRequestDetails(data)} >
                            <div className="col request-box card">
                                <div className="row" >
                                    <div className="col-12 text-right">
                                        <ul className="dropdown-menu">
                                            <li><a href="#"><i className="fa fa-pencil fa-fw"></i> Edit</a></li>
                                            <li><a href="#"><i className="fa fa-trash-o fa-fw"></i> Delete</a></li>
                                            <li className="divider"></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-12 title ">{toTitleCase(data.title)}</div>
                                </div>
                                <div className="row">
                                    <div className="col-9">
                                        <div><FontAwesomeIcon className="fa-right" size="sm" icon={faMapMarker} />{data.address}</div>
                                        <div><FontAwesomeIcon className="fa-right" size="sm" icon={faCalendar} />{moment(data.due_date).format('d MMM YYYY')}</div>
                                        <div className="more-info-btn">
                                            <a className="btn  more-details" onclick={this.toggleImg(event)} data-toggle="collapse" data-target={"#mf-" + index}>
                                                <img src="../../../images/down-arrow.svg" id="arrow" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <img className="user-image" src="../../images/user.svg" alt="" />
                                    </div>
                                </div>

                                <div className="row" >
                                    <div className="col-12 separator cardx"></div>
                                </div>
                                <div className="row more-info">
                                    <div className="col-12 col-xs-12">

                                        <div id={"mf-" + index} className="collapse">
                                            <div className="row">
                                                <div className="col-12">
                                                    <span className="text-uppercase font-weight-bold heading">Details<br /></span>
                                                    {renderHTML(data.content)}
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
                }

            })
        }
    }



    render() {
        const { requests, loading, error, message } = this.props.requestsList;
        const { offers } = this.props.offersList;
        const { comments } = this.props.commentsList;
        const { history, acceptedOffer, user, acceptOfferListALL } = this.props;
        const isLoggedIn = this.props.user;
        let loadingAcceptOfferListALL = true;

        $('.map').height(($(window).height() - 270));

        $('.requests-small').height((($(window).height() - 270)) + 62);
        $('.request-box-details').height(($(window).height() - 270));


        $(window).resize(function () {
            $('.requests-small').height((($(window).height() - 270)) + 62);
            $('.request-box-details').height(($(window).height() - 270));
            if ($(window).width() > 1023) {
                $(".scrollable-content").show();
            }

        });

        if (acceptOfferListALL.loading) {
            loadingAcceptOfferListALL = false;
        } else if (!acceptOfferListALL.loading) {
            loadingAcceptOfferListALL = true;
        }

        //check if the current logged in user has offerd to assist on this request
        let newArray = []
        if (acceptOfferListALL.acceptedOfferList.hasOwnProperty("data")) {
            newArray = acceptOfferListALL.acceptedOfferList.data.filter((el) => {
                // return parseInt(el.id) === parseInt(this.props.user.id);
            });
        }

        newArray;

        let noRequestsMessage = '';
        global.points = [];

        if (requests.length == 0) {
            noRequestsMessage = message;
        }


        $(document).ready(function () {
            $('.carousel').carousel({
                interval: false
            })
        });

        if (loading) {
            $(".loader-spinner-container").removeClass("loader-hide")
            $(".loader-spinner-container").addClass("loader-show")
            // console.log("loading")
        } else {
            $(".loader-spinner-container").removeClass("loader-show")
            $(".loader-spinner-container").addClass("loader-hide")
            // console.log("finished loading")
        }

        return (
            <div className="container requests">
                {this.getRequestsTotal(requests)}
                <div className="row">
                    <div className={this.state.requestsSmallCol + " scrollable-content requests-small"}>
                        <div className="loader-show loader-spinner-container">
                            <FontAwesomeIcon size="lg" className="fa-spin spinner" icon={faSpinner} />
                        </div>
                        {this.renderRequests(requests)}
                        {noRequestsMessage}
                    </div>
                    <div className={this.state.requestBoxDetailsCol}>
                        <div className="row" >
                            <div className="col-12 request-box request-box-details">
                                <div className={"row map " + this.state.showGoogleMap}>
                                    <div className="col-12 map">
                                        <GoogleApiWrapper location={location} points={global.points} />
                                    </div>
                                </div>
                                <div className={this.state.showRequestDetails}>
                                    <div className="row" >
                                        <div className="col-12 text-right">
                                            <ul className="dropdown-menu">
                                                <li><a href="#"><i className="fa fa-pencil fa-fw"></i> Edit</a></li>
                                                <li><a href="#"><i className="fa fa-trash-o fa-fw"></i> Delete</a></li>
                                                <li className="divider"></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-xs-12 col-sm-8">
                                            <div className="row" >
                                                <div className="col-12 col-xs-12 col-sm-12 col-md-8">
                                                    <div className="row tiny-text" >
                                                        <div className="col "><span className="request-status request-status-bg-color request-status-open">Open</span></div>
                                                        <div className="col "><span className={this.state.status === "Assigned" ? "request-status request-status-bg-color request-status-assigned" : "request-status  request-status-assigned"}>Assigned</span></div>
                                                        <div className="col "><span className={this.state.status === "Complete" ? "request-status request-status-bg-color request-status-completed" : "request-status  request-status-completed"}>Completed</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col col-12 title ">{toTitleCase(this.state.title)}</div>
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm-2 col-max-width-fifty">
                                                    <img className="user-image" src="../../images/user.svg" alt="" />
                                                </div>
                                                <div className="col col-sm-6   text-uppercase font-weight-bold titles">Posted by: <br /><span className="text-capitalize"><span className="font-weight-normal">{this.state.name}</span></span></div>
                                                <div className="col col-sm-4 text-right"><br /><span className="text-capitalize font-weight-normal">{this.timeSpan(this.state.created, moment)}.</span></div>
                                            </div>

                                            <div className="row separator" >
                                                <div className="col col-sm-2 col-max-width-fifty d-none d-sm-block"></div>
                                                <div className="col col-sm-10 col-padding-left-0"></div>
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm-2 col-max-width-fifty"><img className="icon-image" src="../../images/placeholder.svg" alt="" /></div>
                                                <div className="col-sm-10 "><span className="text-uppercase font-weight-bold titles">Address</span><br />{this.state.address}</div>
                                            </div>
                                            <div className="row separator" >
                                                <div className="col col-sm-2 col-max-width-fifty d-none d-sm-block"></div>
                                                <div className="col col-sm-10 col-padding-left-0"></div>
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm-2 col-max-width-fifty"><img className="icon-image" src="../../images/calendar.svg" alt="" /></div>
                                                <div className="col-sm-10 "><span className="text-uppercase font-weight-bold titles">Due date</span><br />{moment(this.state.due_date).format('d MMM YYYY')}</div>
                                            </div>


                                        </div>
                                        <div className="col-12 col-xs-12 col-sm-4 col-xs-12 text-center">
                                            <div className="col-12 separator d-sm-none"></div>
                                            <div className="payment-panel">
                                                <div><button type="button" className="btn btn-success offer-to-assist" onClick={this.props.user ? this.modalvisibleOffers : this.modalvisibleLikeHomePage}>
                                                    <span className={loadingAcceptOfferListALL ? "text-in-btn show" : "text-in-btn hide"} > Offer to assist</span>
                                                    <span className={!loadingAcceptOfferListALL ? "spinner-in-btn show" : "text-in-btn hide"}  ><FontAwesomeIcon size="lg" className="fa-spin spinner" icon={faSpinner} /></span>
                                                </button></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 content">
                                            <span className="text-uppercase font-weight-bold titles">Details<br /></span>
                                            {renderHTML(this.state.content)}
                                        </div>
                                    </div>
                                    <div className="row footer" >
                                        <div className="offers-top">
                                            <div className="col-12 tiny-text">
                                                <div className="row">
                                                    <div className="col-12 separator "></div>
                                                    <div className="col-12">
                                                        <span className="text-uppercase font-weight-bold heading">OFFERS <span className={offers.length > 0 ? 'hide ' : ' text-lowercase show-inline-block'}>"No offers for this request"</span><br /></span>
                                                    </div>
                                                    <div className="col-12 separator"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            {this.renderOffers(offers, acceptedOffer, user)}
                                        </div>

                                        <div className="joinConvo">
                                            <div className="col-12">
                                                {isLoggedIn ? (
                                                    <CreateCommentForm fetchComments={this.props.fetchComments} requestId={this.state.request_id} />
                                                ) : (
                                                        <div >
                                                            <div className="col-12 col-xs-12 ">
                                                                <div className="row">
                                                                    <div className="col-12 text-left">
                                                                        <span className="text-uppercase font-weight-bold">Join the conversation</span>
                                                                    </div>
                                                                    <div className="col-12 col-sm-5 join-convo-image-wrapper">
                                                                        <button onClick={this.modalvisibleSignIn.bind(this)} className="btn btn-primary btn-sm">log in</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="renderCommnts">
                                            <div className="col-12">
                                                {this.renderComments(comments)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <Modal visible={this.state.modalvisibleOffers} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-md">
                    <div className="modal-header">
                        <div className="container">
                            <div className="row">
                                <div className="col text-left"> <h5 className="modal-title">Offer to assist</h5></div>
                                <div className="col text-right">
                                    <button type="button" className="close" onClick={this.modalBackdropClicked} data-dismiss="alert">&times;</button>
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

                                        <div><CreateOfferContainer fetchOffers={this.props.fetchOffers} modalvisibleOffers={this.state.modalvisibleOffers} initialValues={this.props.initialValues} requestId={this.state.request_id} location={location} history={history} /></div>
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
                </Modal>

                <Modal visible={this.state.modalvisibleSignIn} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-md">
                    <div className="modal-header">
                        <div className="container">
                            <div className="row">
                                <div className="col col-sm-8 text-left"> <h5 className="modal-title">Sign in to join conversation</h5></div>
                                <div className="col text-right">
                                    <button type="button" className="close" onClick={this.modalBackdropClicked} data-dismiss="alert">&times;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <SignInFormContainer location={location} history={history} showModalWhichPos={this.showModalWhichPos} heading="Sign in to join conversation" origin={this.state.origin} modalBackdropClicked={this.modalBackdropClicked} />
                        </div>
                    </div>

                </Modal>

                <div className="scrollableContentHeight-btn-holder">
                    <button onClick={this.scrollableContentHeight.bind(this)} className="scrollableContentHeight-btn btn btn-secondary btn-block">
                        <img className="user-image" src="../../images/back-arrow.svg" alt="" />
                    </button>
                </div>


                <div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-5">
                            <Modal visible={this.state.modalvisibleLikeHomePage} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-md">
                                <div className="modal-header">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-9 text-left"> <h5 className="modal-title">Sign in to offer your assistance</h5></div>
                                            <div className="col-sm-3 text-right">
                                                <button type="button" class="close" onClick={this.modalBackdropClicked} data-dismiss="alert">&times;</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div id="carouselExampleIndicators" className="carousel slide carouselCheckLogin" data-ride="carousel">
                                            <ol className="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            </ol>
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <div>
                                                        <SignInFormContainer location={location} history={history} showModalWhichPos={this.showModalWhichPos} heading="" origin={this.state.origin} modalBackdropClicked={this.modalBackdropClicked} />
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <div>

                                                        <div><CreateOfferContainer fetchOffers={this.props.fetchOffers} modalvisibleOffers={this.state.modalvisibleOffers} initialValues={this.props.initialValues} requestId={this.state.request_id} location={location} history={history} /></div>
                                                    </div>
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

                            </Modal>
                        </div>
                    </div>
                </div>























            </div>
        );
    }
}

export default BrowseRequests;


