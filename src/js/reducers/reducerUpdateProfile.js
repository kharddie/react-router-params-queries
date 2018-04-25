
import { UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, RESET_UPDATE_PROFILE_STATE } from '../actions/updateProfile';



const INITIAL_STATE = { profileUpdated: false, error: null, loading: false, message: null };

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case UPDATE_PROFILE:
      return { ...state, profileUpdated: false, error: null, loading: true, message: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, profileUpdated: true, error: null, loading: false, message: action.payload.message };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, profileUpdated: false, error: error, loading: false, message: action.payload.message };
    case RESET_UPDATE_PROFILE_STATE:
      return { ...state, profileUpdated: false, error: null, loading: false, message: null };
    default:
      return state;
  }
}
