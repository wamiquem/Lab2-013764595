import { GET_OWNER_PROFILE, OWNER_PROFILE_INPUT_CHANGE_HANDLER, UPDATE_OWNER_IMAGE, UPDATE_OWNER_PROFILE} from '../actions/types';

const initialState = {
    fname: "",
    lname: "",
    phone: "",
    restName: "",
    restZip: "",
    imgURL: "",
    responseMessage: ""
};

const ownerProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_OWNER_PROFILE:
            return {
                ...state,
                fname: action.payload.owner.fname,
                lname: action.payload.owner.lname,
                phone: action.payload.owner.phone,
                restName: action.payload.owner.rest_name,
                restZip: action.payload.owner.rest_zip,
                imgURL: action.payload.owner.imgURL
            }
        case OWNER_PROFILE_INPUT_CHANGE_HANDLER:
            return {
                ...state,
                [action.event.target.name] : action.event.target.value
            }
        case UPDATE_OWNER_IMAGE:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UPDATE_OWNER_PROFILE:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default ownerProfileReducer;