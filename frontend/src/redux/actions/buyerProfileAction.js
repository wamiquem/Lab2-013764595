import { GET_BUYER_PROFILE, BUYER_PROFILE_INPUT_CHANGE_HANDLER, UPDATE_BUYER_IMAGE, UPDATE_BUYER_PROFILE } 
from '../actions/types';
import backendURL from '../../urlconfig';

const getProfile = (token, successcb) => {
    fetch(`${backendURL}/buyer/details/?id=${localStorage.getItem('id')}`,{
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

export const getBuyerProfile = () => dispatch => {
    if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');

            getProfile(token, payload => {
                fetch(`${backendURL}/buyer/profilePic/?id=${localStorage.getItem('id')}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                })
                .then(res => res.blob())
                .then(resAsBlob => {
                    payload.buyer.imgURL = URL.createObjectURL(resAsBlob);
                    dispatch({
                        type: GET_BUYER_PROFILE,
                        payload: payload
                    })
                })
            })
        }   
};

export const buyerProfileChangeHandler = e => {
    return{
        type: BUYER_PROFILE_INPUT_CHANGE_HANDLER,
        event: e
    }
}

export const updateBuyerImage = formData => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/upload/buyer-profile-image`, {
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
                        type: UPDATE_BUYER_IMAGE,
                        payload: payload
                    })
                });
            }else{
                res.text().then(data => {
                    let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_BUYER_IMAGE,
                        payload: payload
                    })
                });
            }
        })
        .catch(err => console.log(err));  
};

export const updateBuyerProfile = data => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${backendURL}/buyer/updateProfile/?id=${localStorage.getItem('id')}`, {
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
                        type: UPDATE_BUYER_PROFILE,
                        payload: payload
                    })
            });
        }else{
            res.text().then(data => {
                let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_BUYER_PROFILE,
                        payload: payload
                    })
            });
        }
    })
    .catch(err => console.log(err)); 
};