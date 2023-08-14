import React, { useEffect } from "react";
import axios from 'axios'

import useApp from "../context/context";
import "../CSS/myMeal.css"
import Nav from "../components/Nav";

import { useUpdateMeals } from "../utils/helperFunctions";



function MyMeals(){
    const {user, myMeals, setMyMeals} = useApp()
    const {removeMeal} = useUpdateMeals();


    useEffect(()=>{
        // const meals = localStorage.getItem('myMeals')
        // setMyMeals(meals)
    }, [])

    useEffect(()=>{
        console.log(myMeals)
    }, [myMeals])

    const addToMyMeals = async (meal) => {
        setMyMeals(prevMyMeals => prevMyMeals.concat(meal))
        // call the api to send data to django 

    }



    return(
        <div className = "myMeals">
            <Nav link = "/" name = "Search"/>
            <h1 id = "title">My Meals</h1>
            {myMeals.length == 0 && <h1 id = "no-meals-message">You have not added any meals yet...</h1>}
            <div className="container">
                {myMeals && myMeals.map((meal) => {
                    return(
                        <div id = "eachMeal" key = {meal.idMeal}>
                            <div className="Meal">
                                <div className="pic">
                                    <img src = {meal.strMealThumb}></img>
                                </div>
                                <div className="title">
                                    <h1>{meal.strMeal}</h1>
                                </div>

                                <div className="cap">
                                    <button onClick={() => removeMeal(meal, meal.idMeal)} >remove from my meals</button>

                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>

        

    )
}

export default MyMeals