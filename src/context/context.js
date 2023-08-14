import React, {useState, useEffect, createContext, useContext} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

  const navigate = useNavigate()

  const [dataSet, setDataSet] = useState(false)
  
  const [myMeals, setMyMeals] = useState([])

  const [login, setLogin] = useState({
    'username': '',
    'password': ''
  })

  const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
  let [loading, setLoading] = useState(true)

  const loginUser = async (e)=>{
    e.preventDefault() 
    // call axios to backend
    let response = await fetch('https://latifab.pythonanywhere.com/api/token/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(login)
    })
    let data = await response.json()
    if(response.status === 200){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/')

    }else{
      // error handle correctly. e.g.: wrong username and password, if only username is filled in, have to fill in password too
      alert('something went wrong')
    }

  }

  const logoutUser = ()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  // revise this part again using dennis video
  const updateToken = async ()=>{
      
    let response = await fetch('https://latifab.pythonanywhere.com/api/token/refresh/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({'refresh': authTokens?.refresh})
    })
    let data = await response.json()
    if(response.status === 200){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data)) 
    }else {
      logoutUser()
    }
    // if(loading){
    //   setLoading(false)
    // }

  }

  useEffect(()=>{
    // if(loading){
    //   updateToken()
    // }
    console.log(authTokens)
    const fourMinutes = 1000 * 60 * 4
    const interval = setInterval(()=>{
      if (authTokens){
        
        updateToken()
      }
    }, fourMinutes)
    return ()=> clearInterval(interval)

    // call to get meals. 
                       
  }, [authTokens])

  const getMeals = async () => {
    await axios.get(`https://latifab.pythonanywhere.com/getMeals/${user.user_id}`)
    .then(res => res.data) 
    .then(data => {
      console.log(data.meals)
      data.meals.length > 0 && setMyMeals(data.meals) 
    })
    .catch(error => console.log(error));

  }

  useEffect(()=>{
    user && getMeals()
    
  }, [user])

  

  return (
    <AppContext.Provider value={{ login, setLogin, loginUser, logoutUser, user, dataSet, setDataSet, myMeals, setMyMeals }}>
      {children}
    </AppContext.Provider>
  );

};

  const useApp = () => {
    const context = useContext(AppContext);
  
    if (context === undefined) {
      throw new Error("useTheme must be used within a AppProvider");
    }
    return context;
  };
  
  export default useApp;