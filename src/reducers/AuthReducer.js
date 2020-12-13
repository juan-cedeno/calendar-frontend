import { types } from "../types/types";


const initialState = {
    checking : true,
}

export const AuthReducer = (state = initialState , action) => {
    
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking : false,
                loading : true
            }
        case types.checkingUser : 
            return {
                ...state,
                checking : false
            }
            
        case types.LogAuth : 
            return {
                checking : false
            }
            

    
        default:
            return state;
    }
    
}
