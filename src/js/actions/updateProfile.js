import axios from 'axios';


//update  profile
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const RESET_UPDATE_PROFILE_STATE = 'RESET_UPDATE_PROFILE_STATE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/react-router-params-queries-api/' : '/api';

export function updateProfile(profile, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: profile,
    url: `${ROOT_URL}/users/update_profile.php`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: UPDATE_PROFILE,
    payload: request
  };
}

export function updateProfileSuccess(payload) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: payload
  };
}

export function updateProfileFailure(payload) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: payload
  };
}

export function resetUpdateProfileState() {
  return {
    type: RESET_UPDATE_PROFILE_STATE
  };
}