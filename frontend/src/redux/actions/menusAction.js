import { GET_MENUS, ADD_MENU_SUCCESS, ADD_MENU_FAILED, MENU_INPUT_CHANGE_HANDLER, UPDATE_MENU_SUCCESS,
    UPDATE_MENU_FAILED, DELETE_MENU_SUCCESS, DELETE_MENU_FAILED } from '../actions/types';
import backendURL from '../../urlconfig';

export const getMenus = () => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/menus/?ownerId=${localStorage.getItem('id')}`,{
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
                    type: GET_MENUS,
                    payload: payload
                })
        })
        .catch(err => console.log(err)); 
};

const postMenuData = (data,successcb, failurecb) => {
    const token = localStorage.getItem('token');
    fetch(`${backendURL}/restaurant/addMenu/`, {
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
            res.text().then(resData => {
                successcb(JSON.parse(resData).message, JSON.parse(resData).menuId);
            });
        }else{
            res.text().then(resData => {
                failurecb(JSON.parse(resData).message);
            }) 
        }
    })
    .catch(err => {
        console.log(err);
    });
}

export const addMenu = (data, isNewImage) => dispatch => {
    postMenuData(data, (successMessage, menuId) => {
        var payload = {
            responseMessage: successMessage, 
            menu: {
                id: menuId,
                section_id: data.sectionId,
                name: data.name,
                description: data.description,
                price: data.price
            }
        }
        if(isNewImage){
            console.log("Inside isnewimage")
            const formData = new FormData();
            formData.append('image', document.querySelector('input[type="file"]').files[0]);
            formData.append('menuId', menuId);
            formData.append('sectionId', data.sectionId);
            formData.append('ownerId', localStorage.getItem('id'));
            
            const token = localStorage.getItem('token');
            fetch(`${backendURL}/upload/menu-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                credentials: 'include',
                body: formData
            })
            .then(res => {
                res.text().then(resData => {
                    payload.responseMessage = JSON.parse(resData).message + " " + successMessage;
                    dispatch({
                        type: ADD_MENU_SUCCESS,
                        payload: payload
                    })
                });
            })
        } else {
            dispatch({
                type: ADD_MENU_SUCCESS,
                payload: payload
            })
        }

    }, failedMessage => {
        let payload = {responseMessage: failedMessage}
            dispatch({
                type: ADD_MENU_FAILED,
                payload: payload
            })
    });
};

export const menuChangeHandler = (id,name,value) => {
    let payload = {id: id, name:name, value:value}
    return{
        type: MENU_INPUT_CHANGE_HANDLER,
        payload: payload
    }
}

export const updateMenu = data => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/updateMenu`, {
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
                res.text().then(responseData => {
                    let payload = {responseMessage: JSON.parse(responseData).message, id: data.id, newSectionId:data.newSectionId}
                    dispatch({
                        type: UPDATE_MENU_SUCCESS,
                        payload: payload
                    })
                });
            }else{
                res.text().then(responseData => {
                    let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
                    dispatch({
                        type: UPDATE_MENU_FAILED,
                        payload: payload
                    })
                }) 
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteMenu = data => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/deleteMenu`, {
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
                res.text().then(responseData => {
                    let payload = {id: data.id}
                    dispatch({
                        type: DELETE_MENU_SUCCESS,
                        payload: payload
                    })
                });
            }else{
                res.text().then(responseData => {
                    let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
                    dispatch({
                        type: DELETE_MENU_FAILED,
                        payload: payload
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
};