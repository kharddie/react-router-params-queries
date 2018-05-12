
import {
    FORGOT_PWD_EMAIL, FORGOT_PWD_EMAIL_SUCCESS, FORGOT_PWD_EMAIL_FAILURE, RESET_FORGOT_PWD_EMAIL,
    FORGOT_PWD_RESET, FORGOT_PWD_RESET_SUCCESS, FORGOT_PWD_RESET_FAILURE, RESET_FORGOT_PWD_RESET
} from '../actions/forgotPwdEmail';


const INITIAL_STATE = {
    forgotPwdEmail: {
        response: null,
        error: null,
        loading: false,
        success: false,
        message: null
    },
    resetEmail: {
        response: null,
        error: null,
        loading: false,
        success: false,
        message: null
    }
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case FORGOT_PWD_EMAIL:
            return { ...state, forgotPwdEmail: { response: null, error: null, loading: true, success: false, message: null } };
        case FORGOT_PWD_EMAIL_SUCCESS:
            return { ...state, forgotPwdEmail: { response: action.payload.data, error: action.payload.error, loading: false, success: true, message: action.payload.message } };
        case FORGOT_PWD_EMAIL_FAILURE:
            return { ...state, forgotPwdEmail: { response: action.payload.data, error: action.payload.error, loading: false, success: false, message: action.payload.message } };
        case RESET_FORGOT_PWD_EMAIL:
            return { ...state, forgotPwdEmail: { response: null, error: null, loading: false, success: false, message: null } };

        case FORGOT_PWD_RESET:
            return { ...state, resetEmail: { response: null, error: null, loading: true, success: false, message: null } };
        case FORGOT_PWD_RESET_SUCCESS:
            return { ...state, resetEmail: { response: action.payload.data, error: action.payload.error, loading: false, success: true, message: action.payload.message } };
        case FORGOT_PWD_RESET_FAILURE:
            return { ...state, resetEmail: { response: action.payload.data, error: action.payload.error, loading: false, success: false, message: action.payload.message } };
        case RESET_FORGOT_PWD_RESET:
            return { ...state, resetEmail: { response: null, error: null, loading: false, success: false, message: null } };

        default:
            return state;
    }
}
