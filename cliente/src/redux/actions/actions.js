import { CLEAR_RESPONSE, GET_BALANCE, POST_USER } from "./actionstype";
import axios from "axios"

export const getBalance = (id) => {
    return async function (dispatch) {
      return axios.get(`http://localhost:3001/users/allatmuser?id=${id}`)
      .then(response => {
        dispatch({ type: GET_BALANCE, payload: response.data });
      })
      .catch(err => console.error(err))
    };
};


export const postUser = (data) => {
    return async function(dispatch){
      return await axios.post('http://localhost:3001/users/', data)
      .then(response => { 
       
        dispatch({type: POST_USER, payload: response.data})
      })
   

    }
  }

export const clearResponse = ()=>{
  return function(dispatch){
  dispatch({type:CLEAR_RESPONSE})
}
}

export function clearState(payload){
  return{
      type: CLEAR_RESPONSE,
      payload
  }
}