/*
 * React component for the navigation bar.
 * 
 * This component displays the main navigation menu for the application, including links to
 * different views, pages, or sections of the application. The component may include dynamic
 * content, such as user information, notifications, or search functionality, and may interact
 * with other components or services to provide a seamless user experience.
 */

import { useNavigate } from "react-router-dom"

import { logout } from '../Fire.jsx'

const Nav = ({ user }) => {
    const navigate = useNavigate()

    // This component displays the main navigation menu for the application when the user is logged in.
    if (user) {
        return (
            <div className="Nav">
                <button onClick={() => navigate("/")}>Home</button>
                <br/>
                <br/>
                <p>{ user.displayName }</p>
                <br/>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }

    // This component displays the main navigation menu for the application when the user is not logged in.
    return (
        <div className="Nav">
            <button onClick={() => navigate("/")}>Home</button>
            <br/>
            <br/>
            <button onClick={() => navigate("/sign-in")}>Sign In</button>
        </div>
    )
}

export default Nav
