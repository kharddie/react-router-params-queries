import CreateCommentForm from '../components/CreateCommentForm.js';
import { resetNewComment,fetchComments,fetchCommentsSuccess } from '../actions/comments';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () => {
            dispatch(resetNewComment());
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        newRequest: state.requests.newRequest,
        user: state.user.user
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm);
