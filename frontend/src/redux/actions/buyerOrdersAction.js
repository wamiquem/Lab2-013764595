import { GET_BUYER_UPCOMING_ORDERS, UPDATE_UPCOMING_ORDER_SUCCESS,
    GET_BUYER_PAST_ORDERS, UPDATE_PAST_ORDER_SUCCESS, UPDATE_ORDER_FAILED} from '../actions/types';
import backendURL from '../../urlconfig';

export const getBuyerUpcomingOrders = () => dispatch => {
    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        fetch(`${backendURL}/buyer/upcomingOrders/?id=${localStorage.getItem('id')}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {     
            var payload = Object.assign({}, data);
                    dispatch({
                        type: GET_BUYER_UPCOMING_ORDERS,
                        payload: payload
                    })           
        })
        .catch(err => console.log(err));
    }  
};

export const getBuyerPastOrders = () => dispatch => { 
    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        fetch(`${backendURL}/buyer/pastOrders/?id=${localStorage.getItem('id')}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
              },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {  
            var payload = Object.assign({}, data);
                    dispatch({
                        type: GET_BUYER_PAST_ORDERS,
                        payload: payload
                    })
        })
        .catch(err => console.log(err));
    }
};

export const sendBuyerMessage = (message, orderType) => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${backendURL}/restaurant/addMessage`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(message)
    })
    .then(res => {
        if(res.status === 200){
            res.text().then(responseData => {
                let payload = {responseMessage: JSON.parse(responseData).message, message: message};
                if(orderType === "buyerUpcoming"){
                    dispatch({
                        type: UPDATE_UPCOMING_ORDER_SUCCESS,
                        payload: payload
                    })
                } else {
                    console.log("Inside buyer past ===", orderType);
                    dispatch({
                        type: UPDATE_PAST_ORDER_SUCCESS,
                        payload: payload
                    })
                } 
            });
        }else{
            res.text().then(responseData => {
                let payload = {responseMessage: JSON.parse(responseData).message}
                    dispatch({
                        type: UPDATE_ORDER_FAILED,
                        payload: payload
                    })
            })
            
        }
    })
    .catch(err => console.log(err));
};