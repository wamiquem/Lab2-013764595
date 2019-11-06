import { combineReducers } from "redux";
import authReducer from "./authReducer";
import buyerProfileReducer from "./buyerProfileReducer";
import ownerProfileReducer from "./ownerProfileReducer";
import restaurantProfileReducer from "./restaurantProfileReducer";
import ownerOrdersReducer from "./ownerOrdersReducer";
import buyerOrdersReducer from "./buyerOrdersReducer";
import sectionsReducer from "./sectionsReducer";
import menusReducer from "./menusReducer";

export default combineReducers({
    auth: authReducer,
    buyerProfile: buyerProfileReducer,
    ownerProfile: ownerProfileReducer,
    restaurantProfile: restaurantProfileReducer,
    ownerOrders: ownerOrdersReducer,
    buyerOrders: buyerOrdersReducer,
    sections: sectionsReducer,
    menus: menusReducer
});