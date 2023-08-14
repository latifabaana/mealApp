import React, { useEffect } from "react";
import useApp from "../context/context";
import "../CSS/moreInfo.css"

function MoreInfo(){

    return(
        <div className="moreInfo">
            {/* <div className="moreinfo-container">
                <h1>Ingredients</h1>
                <ul>
                    {ingredients.map((ingredient) => {
                        return(
                            <li>{ingredient}</li>
                        )
                    })}
                </ul>
                <button id ="exit">Understood!</button>
            </div> */}

            {/* <h1>Instructions</h1>
            <ul>
                {instructions.map((instruction) => {
                    return(
                        <li>{instruction}</li>
                    )
                })}
            </ul> */}
        </div>
    )
}

export default MoreInfo