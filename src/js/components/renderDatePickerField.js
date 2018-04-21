import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';


const RenderDatePickerField = ({ input, label, placeholder, defaultValue, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label className="control-label">{label}</label>
    <div>
      <DatePicker {...input} dateForm="DD/MM/YYYY" selected={input.value} />
      {touched && error && <span>{error}</span>}
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

export default RenderDatePickerField










