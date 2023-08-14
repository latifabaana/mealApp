import {Route,useNavigate, Outlet} from 'react-router-dom'
import React, {useState, useEffect} from "react";
import useApp from "../context/context";

const PrivateRoute = () => {
    const navigate = useNavigate();
    const {user} = useApp()
    // with this useEffect, the page always goes to login and not to the homepage if not logged in.

    useEffect(()=>{
        console.log(user)
        !user && navigate("/login")
        
    }, [user])

    return user && <Outlet />

    
}

export default PrivateRoute