import React from "react";
import { connect } from "react-redux";
import { toTitleCase } from '../helper/index.js';

function mapStateToProps(state) {
    console.log("MyRequestsDetails mapStateToProps =");
    console.log(state);
    return {
        user: state.user.user,
        requestsList: state.requests.requestsList,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetMe: () => {
            dispatch(resetDeletedPost());
        },
    }
}

class MyRequestsDetails extends React.Component {

    state = {
    }
    componentWillReceiveProps(nextProps) {
        console.log("MyRequestsDetails=" + nextProps);
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    render() {
        const { user, requestsList, params } = this.props;
        let thisRequest = [];

        if (requestsList.requests.length > 0) {
            requestsList.requests.filter((data) => {
                if (parseInt(data.id) === parseInt(params.requestId)) {
                    thisRequest.push(data)
                }
            }
            )
        }

        return (
            <div class="row justify-content-md-center">
                <div class="col-6 col-sm-6 text-left">
                    <h2>{thisRequest.length > 0 ? thisRequest[0].title:""}</h2>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsDetails);