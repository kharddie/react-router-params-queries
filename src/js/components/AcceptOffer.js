import React, { Component } from 'react';
import { acceptedOffer, acceptedOfferSuccess, acceptedOfferFailure } from '../actions/offers';
import {showInfoMessage} from "../actions/infoMessage.js"

//For any field errors upon submission (i.e. not instant check)
const createOffer = (offerId, requestId, userId) => {

    return dispatch(acceptedOffer(offerId, requestId, userId, sessionStorage.getItem('jwtToken')))
        .then(result => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload && result.payload.status !== 200) {
                dispatch(acceptedOfferFailure(result.payload.response.data));
                throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that everything is fine by updating the redux` state
            dispatch(acceptedOfferSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
            dispatch(showInfoMessage(result.payload.data));
        });

}

class AcceptOffer extends React.Component {

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    state = {

    }


    render() {

        const { offerId, requestId, userId } = this.props;

    }
}

export default AcceptOffer;
