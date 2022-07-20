import { GET_BALANCE,POST_USER,CLEAR_RESPONSE } from "../actions/actionstype";


const initialState = {
balance:[],
response:[],
  
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BALANCE:
      
        return {
          ...state,
          balance: action.payload,
          
        };
        case POST_USER:   
          return {
            ...state,
            response: action.payload

          }

          case CLEAR_RESPONSE:
          
          return {
            ...state,
            response: []

          }

        default:
      return { ...state };
  }
    }

export default rootReducer;