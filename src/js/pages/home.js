import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import CreateRequestContainer from '../containers/CreateRequestContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';
import SignUpFormContainer from '../containers/signUpFormContainer.js';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () => {

        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

class Home extends React.Component {

    state = {
        modalvisibleHomePage: false,
        origin: "fromHomePage",
        heading: "",
        userName: ""
    }

    modalBackdropClicked = () => {
        this.setState({ modalvisibleHomePage: false });
    }

    goTOaboutUsPage = () => {
        this.props.history.push("/aboutUs")
    }

    singUpFromHome = () => {
        this.setState({
            heading: "Sign Up to Create a request"
        })
        $('.carousel').carousel(2);
    }

    showModalCreateRequest = () => {
        console.log(this.props);
        this.setState({ modalvisibleHomePage: true });
        if (this.props.user.status === "authenticated") {
            $('.carousel').carousel(1);
            this.setState({
                heading: "Create a request"
            })
        } else {
            $('.carousel').carousel(0);
            this.setState({
                heading: "Sign in to Create a request"
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
            this.setState({
                userName: nextProps.user.user.username
            })
        }
    }

    render() {

        $(document).ready(function () {
            $('.carousel').carousel({
                interval: false
            })
        });
        const { history } = this.props;

        return (
            <div>
                <div className="row justify-content-md-center">
                    <div className="col-sm-5">
                        <Modal visible={this.state.modalvisibleHomePage} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-md">
                            <div className="modal-header">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-10 text-left"> <h5 className="modal-title">{this.state.heading}</h5></div>
                                        <div className="col-2 text-right">
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
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div><SignInFormContainer location={location} history={history} singUpFromHome={this.singUpFromHome} showModalCreateRequest={this.showModalCreateRequest} origin={this.state.origin} /></div>
                                            </div>
                                            <div className="carousel-item">
                                                <div><CreateRequestContainer location={location} history={history} modalBackdropClicked={this.modalBackdropClicked} /></div>
                                            </div>
                                            <div className="carousel-item">
                                                <div><SignUpFormContainer showHeading={false} callingFromHome={true} location={location} history={history} modalBackdropClicked={this.modalBackdropClicked} /></div>
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

                <div className="row">
                    <div className="col-sm-12 col-lg-7">
                        <div className="intro">
                            <div className="row">
                                <div className="col-12 font-weight-bold">
                                    Welcome {this.state.userName} !
                                </div>
                                <div className="col-12">
                                    <h1 className="text-h1-lg intro-2" >Get more done for <span className="orange-font">FREE! </span></h1>
                                </div>
                            </div>

                            <h4 className="intro-3">
                                Find out trusted people in your local community ready to give up their time and complete your task today.
                            </h4>
                            <div className="form-footer">
                                <button className="btn btn-primary btn-lg" onClick={this.showModalCreateRequest.bind(this)}>Get started now</button>
                                <button className="btn btn-primary btn-lg" onClick={this.goTOaboutUsPage}>More Info</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-5"></div>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);