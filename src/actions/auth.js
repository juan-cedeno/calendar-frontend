import Swal from "sweetalert2";
import { fechConToken, loginService } from "../service/loginService";
import { types } from "../types/types";



export const startLogin = (email , password) => {
    
    return async (dispatch) => {

        try {
            
            const resp =  await loginService('auth' , {email , password} , 'POST')
            const body = await resp.json()
            
            if(body.ok) {
                localStorage.setItem('token' , body.token)
                localStorage.setItem('token-time' , new Date().getTime())
                
                dispatch(login({
                    uuid : body.uuid,
                    name : body.name
                }))
                
            } else {
                Swal.fire('Error' , body.mgs , "error")

            } 

        } catch (error) {
            console.log(error);
        }

    }
}

export const startRegisterUser = (email , password , name) => {
    return async (dispatch) => {

        try {
            
            const resp =  await loginService('auth/register' , {email ,  password , name} , 'POST')
            const body = await resp.json()
            
            if(body.ok) {
                localStorage.setItem('token' , body.token)
                localStorage.setItem('token-time' , new Date().getTime())

                dispatch(login({
                    uuid : body.uuid,
                    name : body.name
                }))

            }else {
                Swal.fire('Error' , body.mgs , "error")
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const  checkingUser = () => {
    return async (dispatch) => {

        try {
            
            const resp =  await fechConToken('auth/renew')
            const body = await resp.json()
            
            if(body.ok) {
                localStorage.setItem('token' , body.token)
                localStorage.setItem('token-time' , new Date().getTime())

                dispatch(login({
                    uuid : body.uuid,
                    name : body.name
                }))

            }else {
                dispatch(checking())
            }

        } catch (error) {
            console.log(error);
        }

    }
}

export const startLogAuth = () => {
    return (dispatch) => {

         localStorage.clear()
          dispatch(logAuth())
    }
}

const login = (user) => ({
    type : types.authLogin,
    payload : user
})

const logAuth = () => ({type : types.LogAuth})

const checking = () => ({type : types.checkingUser})


