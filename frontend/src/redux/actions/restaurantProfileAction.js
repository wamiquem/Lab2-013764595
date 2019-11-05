import { GET_RESTAURANT_PROFILE, RESTAURANT_PROFILE_INPUT_CHANGE_HANDLER, UPDATE_RESTAURANT_IMAGE, UPDATE_RESTAURANT_PROFILE } 
from '../actions/types';
import backendURL from '../../urlconfig';

const getProfile = (token, successcb) => {
    fetch(`${backendURL}/restaurant/details/?ownerId=${localStorage.getItem('id')}`,{
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
        successcb(payload);
    })
    .catch(err => console.log(err));
}

export const getRestaurantProfile = () => dispatch => {
    if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');

            getProfile(token, payload => {
                fetch(`${backendURL}/restaurant/profilePic/?ownerId=${localStorage.getItem('id')}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                })
                .then(res => res.blob())
                .then(resAsBlob => {
                    payload.restaurant.imgURL = URL.createObjectURL(resAsBlob);
                    dispatch({
                        type: GET_RESTAURANT_PROFILE,
                        payload: payload
                    })
                })
            })
        }   
};

export const restaurantProfileChangeHandler = e => {
    return{
        type: RESTAURANT_PROFILE_INPUT_CHANGE_HANDLER,
        event: e
    }
}

export const updateRestaurantImage = formData => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/upload/restaurant-profile-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.status === 200){
                res.text().then(data => {
                    let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_RESTAURANT_IMAGE,
                        payload: payload
                    })
                });
            }else{
                res.text().then(data => {
                    let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_RESTAURANT_IMAGE,
                        payload: payload
                    })
                });
            }
        })
        .catch(err => console.log(err));  
};

export const updateRestaurantProfile = data => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${backendURL}/restaurant/updateProfile/?ownerId=${localStorage.getItem('id')}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            res.text().then(data => {
                let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_RESTAURANT_PROFILE,
                        payload: payload
                    })
            });
        }else{
            res.text().then(data => {
                let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_RESTAURANT_PROFILE,
                        payload: payload
                    })
            });
        }
    })
    .catch(err => console.log(err)); 
};