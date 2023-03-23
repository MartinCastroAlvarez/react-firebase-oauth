/**
 * React component for the sign up form.
 *
 * This component displays a form that allows the user to sign up for a new account with the
 * application. The form may include fields for the user's name, email address, password, and
 * other relevant information, as well as validation and error handling logic to ensure that
 * the user's inputs are accurate and complete.
 *
 * The component may interact with other components or services to provide additional functionality,
 * such as social media integrations or email verification, and may communicate with the backend
 * server to create a new user account and store the user's information securely. The component may
 * also use third-party libraries or services, such as form validation or password strength
 * indicators, to enhance the user experience and provide additional security features.
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { auth, registerWithEmailAndPassword } from "../Fire"
import { useAuthState } from "react-firebase-hooks/auth"

import Loading from '../layout/Loading.jsx'

const SignUp = () => {

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
            <h1>Sign Up</h1>
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
              onClick={() => registerWithEmailAndPassword(email, password)}
            >
                Submit
            </button>
            <br/>
            <br/>
            <Link to="/sign-in">
                <button>I already have an account</button>
            </Link>
        </div>
    )
}

export default SignUp
