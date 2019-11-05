import { GET_OWNER_ORDERS, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILED} from '../actions/types';

const initialState = {
    orders: [],
    responseMessage: ""
};

const ownerOrdersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_OWNER_ORDERS:
            return {
                ...state,
                // orders: [...state.orders, action.payload.orders]
                orders: initialState.orders.concat(action.payload.orders)
            }
        case UPDATE_ORDER_SUCCESS:
            const orders = state.orders.map(order => {
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
                orders,
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

export default ownerOrdersReducer;