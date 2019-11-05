import { LOGIN_FAILED, LOGIN_SUCCESS,LOGOUT } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: "",
    responseMessage: "",
    fname: ""
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: action.payload.auth,
                user: action.payload.user,
                responseMessage: action.payload.responseMessage,
                fname: action.payload.fname
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isAuthenticated: action.payload.auth,
                responseMessage: action.payload.responseMessage
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: action.payload.auth,
                user: action.payload.user,
                responseMessage: action.payload.responseMessage,
                fname: action.payload.fname
            }
        default:
            return state;
    }
}

export default authReducer;