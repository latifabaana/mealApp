import './App.css';
import Home from './pages/Home';
import { AppProvider } from './context/context';
import {Routes, Route, useSearchParams} from "react-router-dom"
import MoreInfo from './components/MoreInfo';
import Nav from "./components/Nav"
import MyMeals from './pages/MyMeals';
import Login from './pages/Login'
import useApp from "./context/context";
import { useState } from 'react';

import PrivateRoute from './utils/privateRoute';


function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path = "/login" element = {<Login />} />
          <Route exact element={<PrivateRoute  />}>
            <Route path="/" element={<Home />} />
            <Route path = "/myMeals" element = {<MyMeals />} />
          </Route>
         
          <Route path = "/moreInfo" element = {<MoreInfo />} />
          
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
