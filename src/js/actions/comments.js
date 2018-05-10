import axios from 'axios';
import {ROOT_URL} from '../helper/config';

//Comment list
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const RESET_COMMENTS = 'RESET_COMMENTS';

//Create new comment
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
export const RESET_NEW_COMMENT = 'RESET_NEW_COMMENT';

//Validate comment fields like Title, Categries on the server
export const VALIDATE_COMMENT_FIELDS = 'VALIDATE_COMMENT_FIELDS';
export const VALIDATE_COMMENT_FIELDS_SUCCESS = 'VALIDATE_COMMENT_FIELDS_SUCCESS';
export const VALIDATE_COMMENT_FIELDS_FAILURE = 'VALIDATE_COMMENT_FIELDS_FAILURE';
export const RESET_COMMENT_FIELDS = 'RESET_COMMENT_FIELDS';

//Fetch comment
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE';
export const RESET_ACTIVE_COMMENT = 'RESET_ACTIVE_COMMENT';

//Delete comment
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETEREATE_COMMENT_FAILURE';
export const RESET_DELETED_COMMENT = 'RESET_DELETED_COMMENT';


export function fetchComments(token,requestId) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/comments/read.php?rid=${requestId}`,
    headers: {'Authorization': `Bearer ${token}`}
  });

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}

export function fetchCommentsSuccess(comments) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload: comments
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: FETCH_COMMENTS_FAILURE,
    payload: error
  };
}

export function resetComments() {
  return {
    type: RESET_COMMENTS
  };
}


export function validateCommentFields(props) {
  //note: we cant have /comments/validateFields because it'll match /comments/:id path!
  const request = axios.comment(`${ROOT_URL}/comments/validate/fields`, props);

  return {
    type: VALIDATE_COMMENT_FIELDS,
    payload: request
  };
}

export function validateCommentFieldsSuccess() {
  return {
    type: VALIDATE_COMMENT_FIELDS_SUCCESS
  };
}

export function validateCommentFieldsFailure(error) {
  return {
    type: VALIDATE_COMMENT_FIELDS_FAILURE,
    payload: error
  };
}

export function resetCommentFields() {
  return {
    type: RESET_COMMENT_FIELDS
  }
};

export function createComment(props, tokenFromStorage) {
  const request = axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/comments/create.php`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_COMMENT,
    payload: request
  };
}

export function createCommentSuccess(newComment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: newComment
  };
}

export function createCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    payload: error
  };
}

export function resetNewComment() {
  return {
    type: RESET_NEW_COMMENT
  }
}
;

export function resetDeletedComment() {
  return {
    type: RESET_DELETED_COMMENT
  }
}
;

export function fetchComment(id) {
  const request = axios.get(`${ROOT_URL}/comments/${id}`);

  return {
    type: FETCH_COMMENT,
    payload: request
  };
}


export function fetchCommentSuccess(activeComment) {
  return {
    type: FETCH_COMMENT_SUCCESS,
    payload: activeComment
  };
}

export function fetchCommentFailure(error) {
  return {
    type: FETCH_COMMENT_FAILURE,
    payload: error
  };
}

export function resetActiveComment() {
  return {
    type: RESET_ACTIVE_COMMENT
  }
}


export function deleteComment(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/comments/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_COMMENT,
    payload: request
  };
}

export function deleteCommentSuccess(deletedComment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: deletedComment
  };
}

export function deleteCommentFailure(response) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: response
  };
}