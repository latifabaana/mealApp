import React from "react";
import useApp from "../context/context";
import { useNavigate } from "react-router-dom";
import "../CSS/Nav.css"

function Nav(data){
    //put it in local storage then put it in myMeals again. 
    const {myMeals, setMyMeals, logoutUser} = useApp()
    const navigate = useNavigate()

    function goTo(){
        navigate(data.link)
    }

    return(
        <div className="Nav">
            <button onClick= {goTo} className = "nav-link">{data.name}</button>
            <button onClick= {() =>navigate('/login')} className = "nav-link">login</button>
            <button onClick= {logoutUser} className = "nav-link">Logout</button>
        </div>
    )
}

export default Nav