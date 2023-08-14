import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

import useApp from "../context/context";
import "../CSS/Meal.css"
import { useUpdateMeals } from "../utils/helperFunctions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Meal(data){

    const navigate = useNavigate();

    const { myMeals} = useApp()
    const {removeMeal, addMeal} = useUpdateMeals()

    const [link, setLink] = useState("")

    useEffect(()=>{
        // link && navigate(link)
        console.log(link)
    }, [link])

    useEffect(()=>{
        console.log(myMeals)
    }, [myMeals])

    useEffect(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meal.idMeal}`)
        .then(res=> res.json())
        .then(data=>{ 
            const oneMeal = data.meals[0]
            console.log(data.meals[0])
            Object.keys(oneMeal).forEach(function(key,index){
                if(oneMeal[key] !== "" && oneMeal[key] !== null && key.startsWith("strSource")){
                    console.log(key)
                    setLink(oneMeal[key])
                }
            })
        })
    }, [])

    return(
        <div className="meal-container">
            <div className="Meal">
                <div className="pic">
                    <img src = {data.meal.strMealThumb}></img>
                    {/* this is where the heart icon is supposed to be at the top of the picture */}
                    {!myMeals.includes(data.meal) ? <div id = "add" onClick={() => addMeal(data)}></div>:
                    <div id = "remove" onClick={()=> removeMeal(data.meal, data.meal.idMeal)}></div>}
                </div>
                <div className="title">
                    <h1>{data.meal.strMeal}</h1>
                </div>

                <div className="cap">
                    <a href= {link} target="_blank" >
                        <button>More info</button>
                    </a>
                    {/* only display this if meal is not in myMeals. */}            
                    {!myMeals.some(meal => meal.idMeal == data.meal.idMeal) ? <button onClick = {() => addMeal(data)}>Add</button>:
                    <button onClick={() => removeMeal(data.meal, data.meal.idMeal)}>remove from my meals</button>}

                </div>
               
            </div>
           
        </div>

    )
}

export default Meal