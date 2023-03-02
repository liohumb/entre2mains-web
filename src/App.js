import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Header from 'navigations/header/Header'
import Footer from 'navigations/footer/Footer'
import Home from 'pages/home/Home'
import Register from 'authentification/register/Register'
import Login from 'authentification/login/Login'
import User from 'pages/user/User'

import './assets/styles/style.scss'

function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/profil/:userId" element={<User/>}/>
                    <Route path="/connexion" element={<Login/>}/>
                    <Route path="/inscription" element={<Register/>}/>
                    <Route index path="/" element={<Home/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App
