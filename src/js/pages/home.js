import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import CreateRequestContainer from '../containers/CreateRequestContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () => {
            //sign up is not reused, so we dont need to resetUserFields
            //in our case, it will remove authenticated users
            // dispatch(resetUserFields());
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
        modalvisibleHomePage: false
    }

    modalBackdropClicked = () => {
        this.setState({ modalvisibleHomePage: false });
    }

    showModalCreateRequest = () => {
        this.setState({ modalvisibleHomePage: true });
        if (this.props.user.status = "authenticated") {
            $('.carousel').carousel(1);
        } else {
            $('.carousel').carousel(0);
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
                                                <div><SignInFormContainer location={location} history={history} /></div>
                                            </div>
                                            <div className="carousel-item">
                                                <div><CreateRequestContainer location={location} history={history} /></div>

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
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <div className="intro"><h1 className="text-h1-lg intro-2" >Get more done</h1>
                            <h4 className="intro-3">Over 1.6M trusted people ready to complete your task today Australia-wide</h4>
                            <div className="form-footer">
                                <button className="btn btn-primary btn-lg" onClick={this.showModalCreateRequest}>Get started now</button>
                                <button className="btn btn-primary btn-lg" onClick={this.showModalCreateRequest}>More Info</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5">XXX</div>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);