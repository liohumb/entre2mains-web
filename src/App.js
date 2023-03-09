import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'

import Home from 'pages/home/Home'
import Register from 'authentification/register/Register'
import Login from 'authentification/login/Login'
import User from 'pages/user/User'
import Create from 'pages/create/Create'

import './assets/styles/style.scss'

function App() {
    const user = localStorage.getItem('user')

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {<Route path="/post/nouveau" element={user && (JSON).parse(user).role === "ARTISAN" ? <Create/> : <Navigate to="/"/>} /> }
                    <Route path="/profil/:userId" element={<User/>}/>
                    {user && <Route path="/connexion" element={<Navigate to="/"/>}/>}
                    {!user && <Route path="/connexion" element={<Login/>}/>}
                    <Route path="/inscription/:token" element={<Register/>}/>
                    <Route index path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App