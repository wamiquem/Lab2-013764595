import { GET_RESTAURANT_PROFILE, RESTAURANT_PROFILE_INPUT_CHANGE_HANDLER, UPDATE_RESTAURANT_IMAGE, UPDATE_RESTAURANT_PROFILE} from '../actions/types';

const initialState = {
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cuisine:"",
    imgURL: "",
    responseMessage: ""
};

const restaurantProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RESTAURANT_PROFILE:
            return {
                ...state,
                name: action.payload.restaurant.name,
                phone: action.payload.restaurant.phone,
                street: action.payload.restaurant.street,
                city: action.payload.restaurant.city,
                state: action.payload.restaurant.state,
                zip: action.payload.restaurant.zip,
                cuisine: action.payload.restaurant.cuisine,
                imgURL: action.payload.restaurant.imgURL
            }
        case RESTAURANT_PROFILE_INPUT_CHANGE_HANDLER:
            return {
                ...state,
                [action.event.target.name] : action.event.target.value
            }
        case UPDATE_RESTAURANT_IMAGE:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        case UPDATE_RESTAURANT_PROFILE:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default restaurantProfileReducer;