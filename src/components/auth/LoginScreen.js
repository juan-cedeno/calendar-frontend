import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegisterUser } from '../../actions/auth';
import './login.css';

export const LoginScreen = () => {

    const [loginUser, setLoginUser] = useState({
        email : '',
        password : ''
     })

     const [register, setRegister] = useState({
         name : '',
         emailR : '',
         passwordR : '',
         password2 : ''
     })

     
     const {email , password} = loginUser
     const {name , emailR , passwordR , password2} = register

     const dispatch = useDispatch()
     
     const handlenChangeLogin = (e) => {
         setLoginUser({
            ...loginUser,
            [e.target.name]:e.target.value
        })
     }

     const handlenSubmit = (e) => {
         e.preventDefault()
         dispatch(startLogin(email , password))
     }

     const handlenRegister = (e) => {
         setRegister({
             ...register,
             [e.target.name]:e.target.value
         })
     }

     const handlenSubmitRegister = (e) => {
         e.preventDefault()

         if(passwordR !== password2) {
             return Swal.fire('Error' , 'Password no match' , "error")
         }
         dispatch(startRegisterUser(emailR , passwordR , name))
     }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit = {handlenSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name = "email"
                                value = {email}
                                onChange = {handlenChangeLogin}
                                autoComplete = "off"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name = "password"
                                value = {password}
                                onChange = {handlenChangeLogin}
                                autoComplete = "off"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = {handlenSubmitRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = 'name'
                                value = {name}
                                onChange = {handlenRegister}
                                autoComplete = "off"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = 'emailR'
                                value = {emailR}
                                onChange = {handlenRegister}
                                autoComplete = "off"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name = 'passwordR'
                                value = {passwordR}
                                onChange = {handlenRegister}
                                autoComplete = "off"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name = 'password2'
                                value = {password2}
                                onChange = {handlenRegister}
                                autoComplete = "off"
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}