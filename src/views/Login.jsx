/**
 * React component for the login view.
 *
 * This component displays a form that allows the user to log in with their username and password.
 * The component handles form submission, validation, and error handling, and communicates with
 * the backend server to authenticate the user and redirect them to the appropriate page.
 *
 * The component uses the React Bootstrap library for styling and UI components, and includes
 * several custom components for handling form input, authentication requests, and error messages.
 * The component may also use third-party libraries or services, such as Google or Facebook,
 * for social authentication or single sign-on.
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../Fire"
import { useAuthState } from "react-firebase-hooks/auth"

import Loading from '../layout/Loading.jsx'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    // This hook captures the callback from the Firebase authentication provider.
    // It detects if the User has been authenticated and redirects to the home page.
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    // While Firebase is trying to load the existing session, this shows a loadding message.
    if (loading) {
        return <div className="View">
            <Loading/>
        </div>
    }

    return (
        <div className="View">
            <h1>Login</h1>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
            />
            <br/>
            <br/>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br/>
            <br/>
            <button
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
                Submit
            </button>
            <br/>
            <br/>
            <button onClick={signInWithGoogle}>
                Login with Google
            </button>
            <br/>
            <br/>
            <Link to="/sign-up">
                <button>I don't have an account</button>
            </Link>
        </div>
    )
}

export default Login
