import { FETCH_ORIENTATION,FETCH_ORIENTATIONX } from '../actions/getOrientation';

const INITIAL_STATE = {
  getOrientation: {
    data: null
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ORIENTATIONX:
      return { ...state, getOrientation: { data: action.payload } };
    case FETCH_ORIENTATION:
      return { ...state, getOrientation: { data: action.payload } };

    default:
      return state;
  }
}
