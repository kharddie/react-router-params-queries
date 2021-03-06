import axios from 'axios';
import {ROOT_URL} from '../helper/config';

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

//validate email, if success, then load user and login
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//called when profile is updated in profile to update main user's profile state
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

//log out user
export const LOGOUT_USER = 'LOGOUT_USER';

//verify account
export const VERIFY_ACCOUNT = 'VERIFY_ACCOUNT';
export const VERIFY_ACCOUNT_SUCCESS = 'VERIFY_ACCOUNT_SUCCESS';
export const VERIFY_ACCOUNT_FAILURE = 'VERIFY_ACCOUNT_FAILURE';
export const RESET_VERIFY_ACCOUNT = 'RESET_VERIFY_ACCOUNT';



export function validateEmail(validateEmailToken) {
  //check if token from welcome email is valid, if so, update email as verified and login the user from response
  const request = axios.get(`${ROOT_URL}/validateEmail/${validateEmailToken}`);

  return {
    type: VALIDATE_EMAIL,
    payload: request
  };
}

export function validateEmailSuccess(currentUser) {
  return {
    type: VALIDATE_EMAIL_SUCCESS,
    payload: currentUser
  };
}

export function validateEmailFailure(error) {
  return {
    type: VALIDATE_EMAIL_FAILURE,
    payload: error
  };
}

export function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users/meFromToken.php`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(payload) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: payload
  };
}

export function resetToken() {//used for logout
  return {
    type: RESET_TOKEN
  };
}

export function signUpUser(formValues) {
  const request = axios.post(`${ROOT_URL}/users/create.php`, formValues);

  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function signInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/users/login.php`, formValues);

  return {
    type: SIGNIN_USER,
    payload: request
  };
}

export function signInUserSuccess(payload) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: payload
  };
}

export function signInUserFailure(payload) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: payload
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}


export function updateUserProfile(payload) {
  return {
    type: UPDATE_USER_PROFILE,
    payload: payload
  };
}




export function verifyAccount(data) {
  const request = axios({
    method: 'post',
     data: data,   
    url: `${ROOT_URL}/users/verify_account.php`,
    headers: {}
  });

  return {
    type: VERIFY_ACCOUNT,
    payload: request
  };
}

export function verifyAccountSuccess(user) {
  return {
    type: VERIFY_ACCOUNT_SUCCESS,
    payload: user
  };
}

export function verifyAccountFailure(error) {
  return {
    type: VERIFY_ACCOUNT_FAILURE,
    payload: error
  };
}

export function resetVerifyAccount() {
  return {
    type: RESET_VERIFY_ACCOUNT,
  };
}

