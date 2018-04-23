import React, { Component } from "react";
import CreateRequestContainer from '../containers/CreateRequestContainer.js';

class CreateRequest extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <CreateRequestContainer history={history} />
      </div>
    )
  }
}

export default CreateRequest;
