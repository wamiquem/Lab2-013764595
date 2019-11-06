import { GET_MENUS, ADD_MENU_SUCCESS, ADD_MENU_FAILED, MENU_INPUT_CHANGE_HANDLER, UPDATE_MENU_SUCCESS, 
    UPDATE_MENU_FAILED,DELETE_MENU_SUCCESS, DELETE_MENU_FAILED } from '../actions/types';

const initialState = {
    sections: [],
    menus:[],
    responseMessage: "",
    menuToHandle: "",
    addResponseMessage: ""
};

const menusReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_MENUS:
            let sections = action.payload.sections.map(section => {
                return{
                    name: section.name,
                    id: section._id
                }
            });
            let sectionsWithMenus = action.payload.sections.filter(section => section.menus);
            var menus = sectionsWithMenus.map(section => {
                let availableMenus = section.menus.map( menu => {
                    return{
                        initial_section_id: section._id,
                        section_id: section._id,
                        id: menu._id,
                        name: menu.name,
                        description: menu.description,
                        price: menu.price,
                        image: menu.image
                    }
                })
                return availableMenus;
            })
            menus = menus.flat();
            return {
                ...state,
                sections: initialState.sections.concat(sections),
                menus : initialState.menus.concat(menus)
            }
        case ADD_MENU_SUCCESS:
            return{
                ...state,
                menus: [...state.menus, action.payload.menu],
                addResponseMessage: action.payload.responseMessage,
                responseMessage:""
            }
        case ADD_MENU_FAILED:
            return{
                ...state,
                addResponseMessage: action.payload.responseMessage,
                responseMessage:""
            }
        case MENU_INPUT_CHANGE_HANDLER:
            var menus = state.menus.map(menu => {
                // Find a menu with the matching id
                if(menu.id == action.payload.id){
                    //Return a new object
                    return{
                        ...menu, //copy the existing menu
                        [action.payload.name]: action.payload.value //replace the name with new name
                    }
                }
                // Leave every other menu unchanged
                return menu;
            });
            return {
                ...state,
                menus
            }
        case UPDATE_MENU_SUCCESS:
            var menus = state.menus.map(menu => {
                // Find a menu with the matching id
                if(menu.id == action.payload.id){
                    //Return a new object
                    return{
                        ...menu, //copy the existing menu
                        ["initial_section_id"]: action.payload.newSectionId //replace the name with new name
                    }
                }
                // Leave every other menu unchanged
                return menu;
            });
            return {
                ...state,
                menus : initialState.menus.concat(menus),
                responseMessage: action.payload.responseMessage,
                menuToHandle: action.payload.id,
                addResponseMessage: ""
            }
        case UPDATE_MENU_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage,
                sectionToHandle: action.payload.id,
                addResponseMessage: ""
            }
        // case DELETE_SECTION_SUCCESS:
        //     var sections = state.sections.filter(section => section._id != action.payload.id);
        //     return {
        //         ...state,
        //         sections
        //     };
        // case DELETE_SECTION_FAILED:
        //     return {
        //         ...state,
        //         sections,
        //         sectionToHandle: action.payload.id,
        //         responseMessage: action.payload.responseMessage,
        //         addResponseMessage: ""
        //     };
        default:
            return state;
    }
}

export default menusReducer;