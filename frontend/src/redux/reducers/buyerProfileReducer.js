import { GET_BUYER_PROFILE, BUYER_PROFILE_INPUT_CHANGE_HANDLER, UPDATE_BUYER_IMAGE, UPDATE_BUYER_PROFILE} from '../actions/types';

const initialState = {
    fname: "",
    lname: "",
    phone: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    imgURL: "",
    responseMessage: ""
};

const buyerProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BUYER_PROFILE:
            return {
                ...state,
                fname: action.payload.buyer.fname,
                lname: action.payload.buyer.lname,
                phone: action.payload.buyer.phone,
                street: action.payload.buyer.street,
                unit: action.payload.buyer.unit_no,
                city: action.payload.buyer.city,
                state: action.payload.buyer.state,
                zip: action.payload.buyer.zip_code,
                imgURL: action.payload.buyer.imgURL
            }
        case BUYER_PROFILE_INPUT_CHANGE_HANDLER:
            return {
                ...state,
                [action.event.target.name] : action.event.target.value
            }
        case UPDATE_BUYER_IMAGE:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UPDATE_BUYER_PROFILE:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default buyerProfileReducer;