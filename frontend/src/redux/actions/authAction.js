import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from '../actions/types';
import backendURL from '../../urlconfig';

export const loginBuyer = data => dispatch => {
    fetch(`${backendURL}/buyer/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            localStorage.setItem('userType','buyer');
            res.text().then(data => {
                console.log(data);
                localStorage.setItem('id',JSON.parse(data).id);
                localStorage.setItem('fname',JSON.parse(data).firstName);
                localStorage.setItem('token',JSON.parse(data).token);
                let fname = JSON.parse(data).firstName;
                let payload = {user : "buyer",auth : true, fname:fname, responseMessage: ""}
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.text().then(data => {
                console.log(data);
                let responseMessage = JSON.parse(data).message;
                let payload = {auth : false, responseMessage: responseMessage}
                dispatch({
                    type: LOGIN_FAILED,
                    payload: payload
                })
            })
            
        }
    })
    .catch(err => console.log(err));
};

export const loginOwner = data => dispatch => {
    fetch(`${backendURL}/owner/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200){
            localStorage.setItem('userType','owner');
            res.text().then(data => {
                console.log(data);
                localStorage.setItem('id',JSON.parse(data).id);
                localStorage.setItem('fname',JSON.parse(data).firstName);
                localStorage.setItem('token',JSON.parse(data).token);
                let fname = JSON.parse(data).firstName;
                let payload = {user : "owner",auth : true, fname:fname, responseMessage: ""}
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: payload
                })
            });
        }else{
            res.text().then(data => {
                console.log(data);
                let responseMessage = JSON.parse(data).message;
                let payload = {auth : false, responseMessage: responseMessage}
                dispatch({
                    type: LOGIN_FAILED,
                    payload: payload
                })
            })
            
        }
    })
    .catch(err => console.log(err));
};

export const logout = data => dispatch =>  {
    localStorage.clear();
    let payload = {user : "",auth : false, fname:"", responseMessage: ""}
    dispatch({
        type: LOGOUT,
        payload: payload
    })
}