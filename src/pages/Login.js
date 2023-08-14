import { useState, useEffect } from 'react'
import {Navigate, useNavigate} from "react-router-dom"

import useApp from "../context/context";
import "../CSS/login.css"

function Login() {
    const navigate = useNavigate()

    const {login, setLogin, loginUser, user} = useApp()
    
    // change this to get login state, and if user is set then return but if not navigate to the home page.prevents flicker
    useEffect(()=>{
        user && navigate('/')
    }, [user])

    const handleChange = (e)=>{
        e.preventDefault()
        const {name, value} = e.target
        setLogin(prevLogin => ({
            ...prevLogin,
            [name] : value
        }))

    }

    return(
        <div className="login_wrapper">
            <div className="login_container">
                <form className = "login_form" onSubmit = {loginUser}>
                    <p className = "login_title">Login</p>
                    <p>default username: user default password: pass </p>
                    <div className="form-group login_input-field">
                        <input aria-label="username" 
                        type = "text" 
                        onChange = {handleChange} 
                        name = 'username' 
                        value = {login.username} 
                        placeholder='username'/>
                    </div>
                    
                    <div className="form-group login_input-field">
                        <input aria-label="password" 
                        type = "text" 
                        onChange = {handleChange} 
                        name = 'password' 
                        value = {login.password} 
                        placeholder='password' />
                    </div>

                    <input className="btn solid" aria-label="submit" type = 'submit' /> 
                </form>
            
            </div>
        </div>
    )

}

export default Login