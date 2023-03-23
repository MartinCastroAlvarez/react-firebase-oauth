/*
 * Main React component for the application.
 * 
 * This component is the main entry point for the application and is responsible for
 * rendering the root component and initializing any required services or dependencies.
 * The component also defines the application routes and provides a navigation menu for
 * navigating between the different views.
 * 
 * The component uses the React Router library to define the application routes and the
 * React Bootstrap library for styling and UI components. The component also includes
 * several custom components for handling user authentication, API calls, and data
 * visualization.
 */

import { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css'

import { auth} from './Fire.jsx'

import Nav from './layout/Nav.jsx'

import SignUp from './views/SignUp.jsx'
import Login from './views/Login.jsx'
import Home from './views/Home.jsx'

const App = () => {

    const [user, setUser] = useState(null);

    // When the Firebase auth provider updates the User, this hook updates the app state.
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log('User authenticated: ' + JSON.stringify(user))
            setUser(user)
        })
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Nav user={user}/>
                <Routes>
                    <Route exact path="/sign-up" element={<SignUp/>} />
                    <Route exact path="/sign-in" element={<Login/>} />
                    <Route exact path="/" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App
