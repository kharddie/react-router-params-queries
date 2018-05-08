import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateOfferFields, validateOfferFieldsSuccess, validateOfferFieldsFailure } from '../actions/offers';
import { createOffer, fetchOffers, createOfferSuccess, createOfferFailure, resetNewOffer } from '../actions/offers';
import { showInfoMessage, resetShowInfoMessage } from '../actions/infoMessage'
import moment from 'moment'
import Moment from 'react-moment';

//Client side validation
function validate(values) {
    const errors = {};
    if (!values.contact_number  || values.contact_number .trim() === '') {
        errors.contact_number  = 'Provide phone number';
    }

    return errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateOffer = (values, dispatch, props) => {
    values.user_id = props.user.id;
    values.created = moment(moment(), "YYY,MM,DD").toISOString();
    values.request_id = props.requestId;
    return dispatch(createOffer(values, sessionStorage.getItem('jwtToken')))
        .then(result => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload && result.payload.status !== 200) {
                dispatch(createOfferFailure(result.payload.response.data));
                throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that everything is fine by updating the redux` state
            dispatch(createOfferSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
            dispatch(reset('CreateOfferForm'));
            dispatch(showInfoMessage(result.payload.data));
            props.fetchOffers(props.requestId);
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

    }

    componentDidMount() {
        this.props.initialize(this.props.initialValues); // here add this line to initialize the form
      }

    componentDidUpdate() {
		if(!this.props.initialized)
			this.props.initialize(this.props.initialValues);
	}

    render() {
        const { handleSubmit, submitting, newOffer, user } = this.props;
        return (
            <div className='container'>
                <div class="row justify-content-md-center">
                    <div class={"col-sm-12" + this.state.divClass}>
                        <form className={"offer-form " + this.state.formWidthBg} onSubmit={handleSubmit(validateAndCreateOffer)}>
                            <Field
                                name="contact_number"
                                component={renderField}
                                label="Please provide phone number" />
                            <div className="form-footer">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitting}>
                                    Submit
                                </button>
                                <Link to="/" className="btn btn btn-secondary"> Cancel</Link>
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
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(CreateOfferForm)



