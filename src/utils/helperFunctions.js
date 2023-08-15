import axios from 'axios'
import useApp from '../context/context'

export const useUpdateMeals= () => {
    const {user, myMeals, setMyMeals}  = useApp();

    const removeMeal = async(meal, id) => {
        
        console.log(meal)
        const indexOfObject = myMeals.findIndex(object => {
            return object === meal
        })
    
        setMyMeals(prevMyMeals => {
            const tempMeals = [...prevMyMeals]
            tempMeals.splice(indexOfObject, 1)
            return (tempMeals )
        })
        // remove meal from django database
        let response = await axios.delete(`https://latifab.pythonanywhere.com/removeMeal/${user.user_id}/${id}`)
        if(response.status === 200){
            console.log('meal deleted')
        }else{
            alert('Something went wrong with removing the meal, please try again')
        }
    }

    const addMeal = async(data) => {
        setMyMeals(prevMyMeals => prevMyMeals.concat(data.meal))
        
        // add meal to django database
        let response = await fetch('https://latifab.pythonanywhere.com/postMeals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'strMeal': data.meal.strMeal, 'idMeal': data.meal.idMeal, 'strMealThumb': data.meal.strMealThumb, 'user_id': user.user_id})
        })

        if(response.status === 201){
            console.log('meal added')
        }else{
            alert('Something went wrong with adding the meal, please try again')
        }
       
    }

     // return data and updater functions 
     // so they can be accessed in components
     return {
        removeMeal, addMeal
     };
}

