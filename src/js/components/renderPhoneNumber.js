import React, { Component, PropTypes } from 'react';
//import IntlTelInput from 'react-bootstrap-intl-tel-input'

const RenderPhoneNumber = (props) => {
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <div>
                <IntlTelInput
                    preferredCountries={['AU']}
                    defaultCountry={'AU'}
                    defaultValue={props.phoneNumber}
                    placeholder="Search for a calling code by country"
                    inputClassName="contact_number"
                    onChange={(data) => props.phoneOnChangeHandler(data)}
                />
                <div className={`help-block ${props.phoneValid ? "hide" : "show"}`}>
                    {props.phoneError}
                </div>
            </div>
        </div>
    )
}

export default RenderPhoneNumber;