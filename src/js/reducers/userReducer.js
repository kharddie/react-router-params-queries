
import {
  VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAILURE,
  ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
  SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
  SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE,
  LOGOUT_USER, UPDATE_USER_PROFILE
} from '../actions/users';



const INITIAL_STATE = {
  user: null, status: null, error: null, message: null, loading: false,success: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case VALIDATE_EMAIL:
      return { ...state, user: null, status: 'validate_email', error: null, message: null, loading: true };
    case VALIDATE_EMAIL_SUCCESS:

      return { ...state, user: null, status: 'validate_email', error: error, message: null, loading: false }
    case VALIDATE_EMAIL_FAILURE:
      error = action.payload.data || { message: action.payload.message };      
      return { ...state, user: null, status: 'validate_email', error: error, message: null, loading: false }; 
    case ME_FROM_TOKEN:
      return { ...state, user: null, status: 'storage', error: null, message: null, loading: true };
    case ME_FROM_TOKEN_SUCCESS:
      return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, message: null, loading: false }; 


    case ME_FROM_TOKEN_FAILURE:

      return { ...state, user: null, status: 'storage', error: action.payload.error, message: action.payload.message, loading: false };
    case RESET_TOKEN:
      return { ...state, user: null, status: 'storage', error: null, message: null, loading: false };



    case SIGNUP_USER:
      return { ...state, user: null, status: 'signup', error: null, message: null, loading: true,success: false };
    case SIGNUP_USER_SUCCESS:
      return { ...state, user: null, status: 'signup', error: null, message: action.payload.message, loading: false,success: true };
    case SIGNUP_USER_FAILURE:
      error = action.payload.data || { message: action.payload.message };      
      return { ...state, user: null, status: 'signup', error: error, message: null, loading: false,success: false };


    case SIGNIN_USER:
      return { ...state, user: null, status: 'signin', error: null, message: null, loading: true };
    case SIGNIN_USER_SUCCESS:
      return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, message: null, loading: false }; 
    case SIGNIN_USER_FAILURE:
 
      let message = action.payload.message;
      return { ...state, user: null, status: 'signin', error: error, message: message, loading: false };
    case SIGNIN_USER:
      return { ...state, user: null, status: 'signin', error: null, message: null, loading: true };
    case RESET_USER:
      return { ...state, user: null, status: null, error: null, message: null, loading: false };



    case UPDATE_USER_PROFILE:
      const newState = Object.assign({}, state);
      delete newState.user;
      return { ...newState, user: action.payload.data.user, status: 'authenticated', error: null, message: null, loading: false }; 

    case LOGOUT_USER:
      return { ...state, user: null, status: 'logout', error: null, message: null, loading: false };



    default:
      return state;
  }
}
