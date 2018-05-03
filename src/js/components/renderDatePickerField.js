import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';


const RenderDatePickerField = ({ label,selected,onChange,name,dateFormat, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label className="control-label">{label}</label>
    <div>
      <DatePicker selected onChange name dateFormat />
      {touched && error && <span>{error}</span>}
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

export default RenderDatePickerField














