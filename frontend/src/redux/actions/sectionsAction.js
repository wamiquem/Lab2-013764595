import { GET_SECTIONS, ADD_SECTION_SUCCESS, ADD_SECTION_FAILED, SECTION_INPUT_CHANGE_HANDLER,
UPDATE_SECTION, DELETE_SECTION_SUCCESS, DELETE_SECTION_FAILED } from '../actions/types';
import backendURL from '../../urlconfig';

export const getSections = () => dispatch => {
    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/sections/?ownerId=${localStorage.getItem('id')}`,{
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
                    type: GET_SECTIONS,
                    payload: payload
                }) 
            // this.setState({
            //     sections : this.state.sections.concat(data.sections)
            // });
        })
        .catch(err => console.log(err));
    }   
};

export const addSection = data => dispatch => {
    const token = localStorage.getItem('token');
    fetch(`${backendURL}/restaurant/addSection`, {
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
                let payload = {
                    responseMessage: JSON.parse(responseData).message, 
                    section: {
                        id: JSON.parse(responseData).id,
                        name: data.name
                    }
                }
                    dispatch({
                        type: ADD_SECTION_SUCCESS,
                        payload: payload
                    })
            });
        }else{
            res.text().then(responseData => {
                let payload = {responseMessage: JSON.parse(responseData).message}
                    dispatch({
                        type: ADD_SECTION_FAILED,
                        payload: payload
                    })
            })
            
        }
    })
    .catch(err => console.log(err));
};

export const sectionChangeHandler = (id,e) => {
    let payload = {event: e, id: id}
    return{
        type: SECTION_INPUT_CHANGE_HANDLER,
        payload: payload
    }
}

export const updateSection = data => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/updateSection`, {
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
                    let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
                    dispatch({
                        type: UPDATE_SECTION,
                        payload: payload
                    })
                });
            }else{
                res.text().then(responseData => {
                    let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
                    dispatch({
                        type: UPDATE_SECTION,
                        payload: payload
                    })
                })
                
            }
        })
        .catch(err => console.log(err));
};

export const deleteSection = data => dispatch => {
    const token = localStorage.getItem('token');
        fetch(`${backendURL}/restaurant/deleteSection`, {
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
                        type: DELETE_SECTION_SUCCESS,
                        payload: payload
                    })
                });
                // res.text().then(data => console.log(data));
                // this.props.onDelete(this.props.section._id);
            }else{
                res.text().then(responseData => {
                    let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
                    dispatch({
                        type: DELETE_SECTION_FAILED,
                        payload: payload
                    })
                    // let responseMessage = JSON.parse(data).message;
                    // this.setState({
                    //     message: responseMessage
                    // })
                })
                
            }
        })
        .catch(err => console.log(err));
    // const token = localStorage.getItem('token');
    //     fetch(`${backendURL}/restaurant/updateSection`, {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json,  text/plain, */*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => {
    //         if(res.status === 200){
    //             res.text().then(responseData => {
    //                 let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
    //                 dispatch({
    //                     type: UPDATE_SECTION,
    //                     payload: payload
    //                 })
    //             });
    //         }else{
    //             res.text().then(responseData => {
    //                 let payload = {responseMessage: JSON.parse(responseData).message, id: data.id}
    //                 dispatch({
    //                     type: UPDATE_SECTION,
    //                     payload: payload
    //                 })
    //             })
                
    //         }
    //     })
    //     .catch(err => console.log(err));
};