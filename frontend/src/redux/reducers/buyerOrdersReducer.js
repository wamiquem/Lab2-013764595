import { GET_BUYER_UPCOMING_ORDERS, UPDATE_UPCOMING_ORDER_SUCCESS,
GET_BUYER_PAST_ORDERS, UPDATE_PAST_ORDER_SUCCESS, UPDATE_ORDER_FAILED} from '../actions/types';

const initialState = {
    upcomingOrders: [],
    pastOrders: [],
    responseMessage: ""
};

const buyerOrdersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BUYER_UPCOMING_ORDERS:
            return {
                ...state,
                upcomingOrders: initialState.upcomingOrders.concat(action.payload.orders)
            }
        case UPDATE_UPCOMING_ORDER_SUCCESS:
            var orders = state.upcomingOrders.map(order => {
                // Find an order with the matching id
                if(order.id == action.payload.message.orderId){
                    //Return a new object
                    let orderToUpdate = {...order}
                    orderToUpdate.messages = orderToUpdate.messages.concat(action.payload.message);
                    return orderToUpdate;
                }
                // Leave every other order unchanged
                return order;
            });
            return {
                ...state,
                upcomingOrders: orders,
                responseMessage: action.payload.responseMessage
            }
        case GET_BUYER_PAST_ORDERS:
            return {
                ...state,
                pastOrders: initialState.pastOrders.concat(action.payload.orders)
            }
        case UPDATE_PAST_ORDER_SUCCESS:
            var orders = state.pastOrders.map(order => {
                // Find an order with the matching id
                if(order.id == action.payload.message.orderId){
                    //Return a new object
                    let orderToUpdate = {...order}
                    orderToUpdate.messages = orderToUpdate.messages.concat(action.payload.message);
                    return orderToUpdate;
                }
                // Leave every other order unchanged
                return order;
            });
            return {
                ...state,
                pastOrders: orders,
                responseMessage: action.payload.responseMessage
            }
        case UPDATE_ORDER_FAILED:
            return {
                ...state,
                responseMessage: action.payload.responseMessage
            }
        default:
            return state;
    }
}

export default buyerOrdersReducer;