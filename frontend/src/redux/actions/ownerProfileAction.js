import { GET_OWNER_PROFILE, OWNER_PROFILE_INPUT_CHANGE_HANDLER, UPDATE_OWNER_IMAGE, UPDATE_OWNER_PROFILE } 
from '../actions/types';
import backendURL from '../../urlconfig';

const getProfile = (token, successcb) => {
    fetch(`${backendURL}/owner/details/?id=${localStorage.getItem('id')}`,{
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

export const getOwnerProfile = () => dispatch => {
    if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');

            getProfile(token, payload => {
                fetch(`${backendURL}/owner/profilePic/?id=${localStorage.getItem('id')}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                })
                .then(res => res.blob())
                .then(resAsBlob => {
                    payload.owner.imgURL = URL.createObjectURL(resAsBlob);
                    dispatch({
                        type: GET_OWNER_PROFILE,
                        payload: payload
                    })
                })
            })
        }   
};

export const ownerProfileChangeHandler = e => {
    return{
        type: OWNER_PROFILE_INPUT_CHANGE_HANDLER,
        event: e
    }
}

export const updateOwnerImage = formData => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/upload/owner-profile-image`, {
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
                        type: UPDATE_OWNER_IMAGE,
                        payload: payload
                    })
                });
            }else{
                res.text().then(data => {
                    let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_OWNER_IMAGE,
                        payload: payload
                    })
                });
            }
        })
        .catch(err => console.log(err));  
};

export const updateOwnerProfile = data => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${backendURL}/owner/updateProfile/?id=${localStorage.getItem('id')}`, {
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
                        type: UPDATE_OWNER_PROFILE,
                        payload: payload
                    })
            });
        }else{
            res.text().then(data => {
                let payload = {responseMessage: JSON.parse(data).message}
                    dispatch({
                        type: UPDATE_OWNER_PROFILE,
                        payload: payload
                    })
            });
        }
    })
    .catch(err => console.log(err)); 
};