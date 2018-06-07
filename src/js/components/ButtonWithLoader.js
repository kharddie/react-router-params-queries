import React from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

const ButtonWithLoader = props => (
    <button
        type="submit"
        className="btn btn-primary btn-with-spinner btn-block"
        disabled={props.submitting}>
        <span className={!props.loading ? "show" : "hide"} >{props.name}</span>
        <span className={props.loading ? "show" : "hide"}  ><FontAwesomeIcon size="lg" className="fa-spin spinner" icon={faSpinner} /></span>
    </button>
);


export default ButtonWithLoader;