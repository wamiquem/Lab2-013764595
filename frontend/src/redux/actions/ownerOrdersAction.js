import { GET_OWNER_ORDERS, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILED } from '../actions/types';
import backendURL from '../../urlconfig';

export const getOwnerOrders = () => dispatch => {
    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/allOrders/?ownerId=${localStorage.getItem('id')}`,{
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
                        type: GET_OWNER_ORDERS,
                        payload: payload
                    })              
        })
        .catch(err => console.log(err));
    }   
};

export const sendOwnerMessage = message => dispatch => {
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
                let payload = {responseMessage: JSON.parse(responseData).message, message: message}
                    dispatch({
                        type: UPDATE_ORDER_SUCCESS,
                        payload: payload
                    })
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