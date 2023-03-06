import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Home from 'pages/home/Home'
import Register from 'authentification/register/Register'
import Login from 'authentification/login/Login'
import User from 'pages/user/User'

import './assets/styles/style.scss'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/profil/:userId" element={<User/>}/>
                    <Route path="/connexion" element={<Login/>}/>
                    <Route path="/inscription" element={<Register/>}/>
                    <Route index path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App