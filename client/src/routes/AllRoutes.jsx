import React from "react";
import { Route, Routes } from 'react-router-dom'
import SignUp from "../pages/signUp";
import style from "../assets/css/style.scss"
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";

const AllRoutes = () => {

    return ( 
        <>
            <div>
                <Routes>
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/' element={<DashboardPage />} />
                </Routes>
            </div>
        </>
     );
}
 
export default AllRoutes;