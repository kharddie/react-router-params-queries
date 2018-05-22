import React, { Component } from 'react';
import { connect } from "react-redux";
import { getParameterByName } from '../helper/index';
import { Link } from 'react-router';
import { verifyAccount, verifyAccountSuccess, verifyAccountFailure, resetVerifyAccount } from '../actions/users';

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAccount: () => {
            let token = getParameterByName("token");
            if (token === '' || !token) {
                let error = {
                    message: "No token provided.Contact admin",
                    data: {},
                    error: error
                }
                dispatch(verifyAccountFailure(error));
            } else {
                let data = { token: token }
                return dispatch(verifyAccount(data))
                    .then((result) => {
                        //Note: Error's "data" is in result.payload.response.data
                        // success's "data" is in result.payload.data
                        if (!result.payload) { //1st onblur
                            return;
                        }
                        let { data, status } = result.payload;
                        if (status != 200) {
                            dispatch(verifyAccountFailure(data.error));
                        } else {
                            if (data.error) {
                                dispatch(verifyAccountFailure(data.error));
                            } else {
                                dispatch(verifyAccountSuccess(data));
                            }
                        }
                    });
            }
        },
        resetVerifyAccount: () => {
            dispatch(resetVerifyAccount());
        },
    }
}

function mapStateToProps(state, ownProps) {
    return {
        verifyAcc: state.user.verifyAccount
    };
}



class VerifyAccount extends Component {
    state = {
        message: null
    }

    componentWillMount() {
        this.props.verifyAccount();
    }

    componentWillReceiveProps(nextProps) {
        //forgot password email message
        if (nextProps.verifyAcc.message) {
            this.setState({
                message: nextProps.verifyAcc.message
            })
            this.props.resetVerifyAccount();
        }
    }

    goToHomePage = () => {
        this.props.history.push('/');
    }






    render() {
        return (
            <div>
                <div className='container'>
                    <div class="row justify-content-md-center">
                        <div class="col-sm-12 col-md-8">
                            <div>
                                <div><h2>Verify account page</h2> </div>
                            </div>
                            <span classname={this.state.message ? "show" : "hide"}>{this.state.message}  <br /> <button className="btn btn-primary btn-sm" onClick={this.goToHomePage}> log in</button></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
