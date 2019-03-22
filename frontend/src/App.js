import React, {Component} from 'react';
import './App.css';
import Bear from "./Bear"
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import axios from "axios";
import thunk from 'redux-thunk'



export const getBearsSuccess = bears => ({
    type: 'GET_BEARS_SUCCESS',
    bears
});
export const getBearsFailed = () => ({ type: 'GET_BEARS_FAILED'});

export const getBears = () => async (dispatch) => {
    try {
        console.log('get bear new')
        const response = await axios.get(`http://localhost:3001/api/bears`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getBearsSuccess(responseBody));
    } catch (error) {
        console.error(error);
        dispatch(getBearsFailed());
    }
}

//----------------------------------------------

export const findBear = (bear_id) => async (dispatch) => {
    try {
        console.log('find bear :',bear_id)

        const response = await axios.get(`http://localhost:3001/api/bears/${bear_id}`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getBearsSuccess(responseBody));
    }catch (err){
        console.error(err);
        dispatch(getBearsFailed());
    }
}

export const addBear = (bear) => async (dispatch) => {
    try{
        console.log('add bear :',bear)

        const response = await axios.post(`http://localhost:3001/api/bears`,  bear )
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getBearsSuccess(responseBody));
    }catch(err){
        console.error(err);
        dispatch(getBearsFailed());
    }

}
export const updateBear = (bear) => async (dispatch) => {
    try{
        console.log('update bear :',bear)

        const response = await axios.put(`http://localhost:3001/api/bears/${bear.bear_id}`,  bear )
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getBearsSuccess(responseBody));
    }catch(err){
        console.error(err);
        dispatch(getBearsFailed());
    }

}
export const deleteBear = (bear_id) => async (dispatch) => {
    try {
        console.log('delete bear :',bear_id)

        const response = await axios.delete(`http://localhost:3001/api/bears/${bear_id}`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getBearsSuccess(responseBody));
    }catch (err){
        console.error(err);
        dispatch(getBearsFailed());
    }
}


export const bearReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_BEARS_SUCCESS':
            console.log('action: ' , action.bears)
            return action.bears
        case 'GET_BEARS_FAILED':
            console.log('action: Failed')
            return action.bears
        default:
            return state
    }
}


const rootReducer = combineReducers( {
    bearsPass: bearReducer
})
export const store = createStore(rootReducer, applyMiddleware(logger, thunk))

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Bear />
            </Provider>
        );
    }
}

export default App;
