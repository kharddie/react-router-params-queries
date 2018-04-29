
import { APP_INFO_DISPLAY , RESET_APP_INFO_DISPLAY } from '../actions/appInfoDisplay';

const INITIAL_STATE = {
    appInfoDisplay: { data: null, showInfoBar: false }
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case APP_INFO_DISPLAY :
            return { ...state, appInfoDisplay: { data: action.payload, showInfoBar: true } };
        case RESET_APP_INFO_DISPLAY :
            return { ...state, appInfoDisplay: { data: null, showInfoBar: false } };
        default:
            return state;
    }
}