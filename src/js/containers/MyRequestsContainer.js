import MyRequests from '../components/MyRequests';
import { connect } from 'react-redux';
import {
    fetchRequests, fetchRequestsSuccess, fetchRequestsFailure, resetRequest,
    deleteRequest, deleteRequestSuccess, deleteRequestFailure,
} from '../actions/requests';

const mapDispatchToProps = (dispatch, ownProps) => {
    let jwtToken = sessionStorage.getItem('jwtToken');
    console.log(ownProps);
    let myRequests = "myRequests";
    let userId = JSON.parse(sessionStorage.getItem("user")).id
    return {
        fetchRequests: () => {
            dispatch(resetRequest());
            if (userId) {
                dispatch(fetchRequests(jwtToken, userId, myRequests)).then((response) => {
                    !response.error ? dispatch(fetchRequestsSuccess(response.payload.data)) : dispatch(fetchRequestsFailure(response.payload));
                });
            }
        },
        resetRequest: () => {
            dispatch(resetRequest());
        },
        deleteRequest: (id) => {
            dispatch(deleteRequest(id, jwtToken)).then((response) => {
                !response.error ? dispatch(deleteRequestSuccess(response.payload.data)) : dispatch(deleteRequestFailure(response.payload));
            })
        },
        updateRequest: () => {
            dispatch(updateRequest(id, jwtToken)).then((response) => {
                !response.error ? dispatch(updateRequestSuccess(response.payload.data)) : dispatch(updateRequestFailure(response.payload));
            })
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.user,
        requestsList: state.requests.requestsList,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);
