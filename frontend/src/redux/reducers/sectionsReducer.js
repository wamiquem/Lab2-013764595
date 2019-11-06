import { GET_SECTIONS, ADD_SECTION_SUCCESS, ADD_SECTION_FAILED, SECTION_INPUT_CHANGE_HANDLER,
    UPDATE_SECTION, DELETE_SECTION_SUCCESS, DELETE_SECTION_FAILED } from '../actions/types';

const initialState = {
    sections: [],
    responseMessage: "",
    sectionToHandle: "",
    addResponseMessage: ""
};

const sectionsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SECTIONS:
            return {
                ...state,
                sections: initialState.sections.concat(action.payload.sections)
            }
        case ADD_SECTION_SUCCESS:
            return{
                ...state,
                sections: [...state.sections, action.payload.section],
                addResponseMessage: action.payload.responseMessage,
                responseMessage:""
            }
        case ADD_SECTION_FAILED:
            return{
                ...state,
                addResponseMessage: action.payload.responseMessage,
                responseMessage:""
            }
        case SECTION_INPUT_CHANGE_HANDLER:
            var sections = state.sections.map(section => {
                // Find a section with the matching id
                if(section._id === action.payload.id){
                    //Return a new object
                    return{
                        ...section, //copy the existing section
                        [action.payload.event.target.name]: action.payload.event.target.value  //replace the name with new name
                    }
                }
                // Leave every other section unchanged
                return section;
            });
            return {
                ...state,
                sections
            }
        case UPDATE_SECTION:
            return {
                ...state,
                responseMessage: action.payload.responseMessage,
                sectionToHandle: action.payload.id,
                addResponseMessage: ""
            }
        case DELETE_SECTION_SUCCESS:
            var sections = state.sections.filter(section => section._id != action.payload.id);
            return {
                ...state,
                sections
            };
        case DELETE_SECTION_FAILED:
            return {
                ...state,
                sectionToHandle: action.payload.id,
                responseMessage: action.payload.responseMessage,
                addResponseMessage: ""
            };
        default:
            return state;
    }
}

export default sectionsReducer;