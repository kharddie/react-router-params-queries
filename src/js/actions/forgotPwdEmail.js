import axios from 'axios';
import {ROOT_URL} from '../helper/config';

//Resend validation email
export const FORGOT_PWD_EMAIL = 'FORGOT_PWD_EMAIL';
export const FORGOT_PWD_EMAIL_SUCCESS = 'FORGOT_PWD_EMAIL_SUCCESS';
export const FORGOT_PWD_EMAIL_FAILURE = 'FORGOT_PWD_EMAIL_FAILURE';
export const RESET_FORGOT_PWD_EMAIL = 'RESET_FORGOT_PWD_EMAIL';
//reset pwd
export const FORGOT_PWD_RESET = 'FORGOT_PWD_RESET';
export const FORGOT_PWD_RESET_SUCCESS = 'FORGOT_PWD_RESET_SUCCESS';
export const FORGOT_PWD_RESET_FAILURE = 'FORGOT_PWD_RESET_FAILURE';
export const RESET_FORGOT_PWD_RESET = 'RESET_FORGOT_PWD_RESET';


export function forgotPwdEmail(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
     data: props,   
    url: `${ROOT_URL}/users/forgot_pwd.php`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: FORGOT_PWD_EMAIL,
    payload: request
  };
}

export function forgotPwdEmailSuccess(message) {
  return {
    type: FORGOT_PWD_EMAIL_SUCCESS,
    payload: message
  };
}

export function forgotPwdEmailFailure(error) {
  return {
    type: FORGOT_PWD_EMAIL_FAILURE,
    payload: error
  };
}

export function resetForgotPwdEmail() {
  return {
    type: RESET_FORGOT_PWD_EMAIL
  };
}




export function forgotPwdReset(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
     data: props,   
    url: `${ROOT_URL}/users/forgot_pwd_reset.php`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: FORGOT_PWD_RESET,
    payload: request
  };
}

export function forgotPwdResetSuccess(message) {
  return {
    type: FORGOT_PWD_RESET_SUCCESS,
    payload: message
  };
}

export function forgotPwdResetFailure(error) {
  return {
    type: FORGOT_PWD_RESET_FAILURE,
    payload: error
  };
}

export function resetForgotPwdReset() {
  return {
    type: RESET_FORGOT_PWD_RESET
  };
}