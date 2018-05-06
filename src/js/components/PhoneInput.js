import React, { Component, PropTypes } from 'react';
import IntlTelInput from 'react-bootstrap-intl-tel-input'

class PhoneInput extends Component {
    render() {
        return (
            <IntlTelInput
                preferredCountries={['US', 'GB']}
                defaultCountry={'US'}
                defaultValue={'+1 555-555-5555'}
                onChange={(data) => this.onChangeHandler(data)}
            />
        )
    }
}

export default PhoneInput;