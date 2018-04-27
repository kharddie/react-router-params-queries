import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateOfferFields, validateOfferFieldsSuccess, validateOfferFieldsFailure } from '../actions/offers';
import { createOffer, createOfferSuccess, createOfferFailure, resetNewOffer } from '../actions/offers';

import moment from 'moment'
import Moment from 'react-moment';

//Client side validation
function validate(values) {
    const errors = {};
    if (!values.content || values.content.trim() === '') {
        errors.content = 'Enter some content';
    }

    return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
    //check if user id exists
    return dispatch(validateOfferFields(values))
        .then((result) => {
            //Note: Error's "data" is in result.payload.response.data
            // success's "data" is in result.payload.data
            if (!result.payload.response) { //1st onblur
                return;
            }

            let { data, status } = result.payload.response;
            //if status is not 200 or any one of the fields exist, then there is a field error
            if (response.payload.status != 200 || data.title || data.categories || data.description) {
                //let other components know of error by updating the redux` state
                dispatch(validateOfferFieldsFailure(data));
                throw data; //throw error
            } else {
                //let other components know that everything is fine by updating the redux` state
                dispatch(validateOfferFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
            }
        });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateOffer = (values, dispatch, props) => {
    values.id = props.user.id;
    values.created = moment(moment(), "YYY,MM,DD").toISOString();
    values.request_id = props.requestId;
    return dispatch(createOffer(values, sessionStorage.getItem('jwtToken')))
        .then(result => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(createOfferFailure(result.payload.response.data));
                throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that everything is fine by updating the redux` state
            dispatch(createOfferSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
            dispatch(reset('CreateOfferForm'));
        });

}

class CreateOfferForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        divClass: "",
        formWidthBg: ""
    }

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
        if (this.props.location.href.indexOf("createOffer") > -1) {
            this.setState({
                divClass: " col-md-6",
                formWidthBg: "form-width-bg"
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        /* if (!nextProps.newOffer.offer && !nextProps.newOffer.error) {
             this.props.history.push('/browseOffers');
             this.props.resetMe();
         }
         */
    }

    render() {
        const { handleSubmit, submitting, newOffer, user } = this.props;
        return (
            <div className='container'>
                <div class="row justify-content-md-center">
                    <div class={"col-sm-12" + this.state.divClass}>
                        <div><h2>Create Offer</h2>
                        </div>

                        <form className={"offer-form " + this.state.formWidthBg} onSubmit={handleSubmit(validateAndCreateOffer)}>
                            <Field
                                name="content"
                                component={renderTextArea}
                                label="Say something about your qualifications/skills/volunteer*" />
                            <div className="form-footer">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitting}>
                                    Submit
            </button>
                                <Link
                                    to="/"
                                    className="btn btn btn-secondary"> Cancel
            </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default reduxForm({
    form: 'CreateOfferForm', // a unique identifier for this form
    validate // <--- validation function given to redux-form

})(CreateOfferForm)



