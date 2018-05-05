import { SHOW_INFO_MESSAGE, RESET_SHOW_INFO_MESSAGE } from '../actions/infoMessage';


const INITIAL_STATE = {
  infoMessage: {
    message: null,
    display: false
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case SHOW_INFO_MESSAGE:
      return { ...state, infoMessage: { message: action.payload.message, display: true } };
    case RESET_SHOW_INFO_MESSAGE:
      return { ...state, infoMessage: { message: null, display: false } };

    default:
      return state;
  }
}


