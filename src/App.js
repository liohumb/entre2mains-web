import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'

import Home from 'pages/home/Home'
import Register from 'authentification/register/Register'
import Login from 'authentification/login/Login'
import User from 'pages/user/User'
import Create from 'pages/create/Create'

import './assets/styles/style.scss'

function App() {
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/post/nouveau" element={<Create/>}/>
                    <Route path="/profil/:userId" element={<User/>}/>
                    {isAuthenticated && <Route path="/connexion" element={<Navigate to="/"/>}/>}
                    {!isAuthenticated && <Route path="/connexion" element={<Login/>}/>}
                    <Route path="/inscription/:token" element={<Register/>}/>
                    <Route index path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App