import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import CreateRequestContainer from '../containers/CreateRequestContainer.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

export default class Home extends React.Component {
    state = {
        modalvisibleProducts: false
    }

    modalBackdropClicked = () => {
        this.setState({ modalvisibleProducts: false });
    }

    showModalCreateRequest = () => {
        this.setState({ modalvisibleProducts: true });
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
                        <Modal visible={this.state.modalvisibleProducts} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-md">
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
                                                <div><CreateRequestContainer location={location} history={history}/></div>
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
