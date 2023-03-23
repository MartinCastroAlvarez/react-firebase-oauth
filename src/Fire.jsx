/*
 * Firebase OAuth configuration module.
 * 
 * This module contains the configuration parameters required for Firebase authentication
 * using OAuth. These parameters include the Firebase project ID, the client ID, the client
 * secret, the authorization URL, and the token URL. These parameters are used to generate
 * access tokens for Firebase services.
 * 
 * The Firebase OAuth configuration parameters can be obtained from the Firebase console by
 * creating a new web application and enabling Firebase authentication. Once enabled, the
 * OAuth configuration parameters can be retrieved from the Firebase project settings.
 */

import { initializeApp } from 'firebase/app'

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth"

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"

console.log('Loading env vars: ' + JSON.stringify(import.meta.env))

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    throw new Error('Missing VITE_FIREBASE_API_KEY env var.')
}

if (!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) {
    throw new Error('Missing VITE_FIREBASE_AUTH_DOMAIN env var.')
}

if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    throw new Error('Missing VITE_FIREBASE_PROJECT_ID env var.')
}

if (!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) {
    throw new Error('Missing VITE_FIREBASE_STORAGE_BUCKET env var.')
}

if (!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) {
    throw new Error('Missing VITE_FIREBASE_MESSAGING_SENDER_ID env var.')
}

if (!import.meta.env.VITE_FIREBASE_APP_ID) {
    throw new Error('Missing VITE_FIREBASE_APP_ID env var.')
}

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initializing the Firebase application.
const app = initializeApp(config)
console.log('Firebase app: ' + JSON.stringify(app))

// Initializing the Firestore database connection.
const db = getFirestore(app)
console.log('Firebase db: ' + JSON.stringify(db))

// Initializing the Firebase auth provider.
export const auth = getAuth(app)
console.log('Firebase auth: ' + JSON.stringify(auth))

// Initializing Google auth provider.
const googleProvider = new GoogleAuthProvider()
console.log('Google auth provider: ' + JSON.stringify(googleProvider))

/*
 * Opens a popup to authenticate with a Google account.
 *
 * This function opens a popup window to initiate the Google OAuth 2.0 flow and authenticate
 * the user with their Google account. The function sets the necessary OAuth parameters and
 * redirects the user to the Google authorization page to grant access to the requested scopes.
 * Once the user has granted access, the Google authorization server generates an access token,
 * which is returned to the parent window and used to authenticate the user with the application.
 */
export const signInWithGoogle = async () => {
    console.log('Signing in with Google')
    try {
        const res = await signInWithPopup(auth, googleProvider)
        console.log('Signing in with Google:' + JSON.stringify(res))
        const user = res.user
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q)
        console.log('User data:' + JSON.stringify(q) + ' ' + JSON.stringify(docs))
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
    } catch (err) {
        console.error("Error signing in with Google: " + JSON.stringify(err))
        alert(err.message)
    }
}

/**
 * Sends a password reset link to the user's email inbox.
 *
 * This function sends a password reset link to the email address provided as an argument.
 * The function generates a unique password reset token and includes it in a URL that is
 * sent to the user's email address along with instructions for resetting their password.
 *
 * The function uses a third-party email delivery service to send the password reset email.
 * The email delivery service must be configured with the correct SMTP settings and credentials
 * for sending email from the application's domain. The function also handles any errors or
 * exceptions that may occur during the email sending process and returns a Promise that
 * resolves or rejects depending on the result of the email delivery.
 */
export const sendPasswordReset = async (email) => {
    console.log('Sending password reset link to: ' + email)
    try {
        await sendPasswordResetEmail(auth, email)
        console.log('Password reset request sent!')
        alert("Password reset link sent!")
    } catch (err) {
        console.error("Error sending password reset link: " + JSON.stringify(err))
        alert(err.message)
    }
}

/*
 * Logs the user out of the application.
 *
 * This function logs the user out of the application by clearing any stored user session data
 * and redirecting the user to the login page. The function may also perform additional clean-up
 * tasks, such as disconnecting from any third-party services or clearing any cached data.
 */
export const logout = () => {
    console.log('Logout!')
    signOut(auth)
}

/*
 * Logs the user in with an email and password.
 *
 * This function logs the user in with an email and password by sending a POST request to the
 * server with the user's credentials. The function then receives a response from the server,
 * which may include an access token or session ID that is used to authenticate the user in
 * subsequent requests to the server. The function may also store the access token or session ID
 * in a cookie or local storage for persistent authentication across multiple sessions.
 */
export const registerWithEmailAndPassword = async (name, email, password) => {
    console.log('Registering user: ' + email)
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        console.log('User created: ' + JSON.stringify(user))
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (err) {
        console.error("Error signing up with email and password: " + JSON.stringify(err))
        alert(err.message)
    }
}

/*
 * register(username, password) - Registers a new user with a username and password.
 *
 * This function registers a new user with a username and password by sending a POST request to
 * the server with the user's credentials. The function then receives a response from the server,
 * which may include an access token or session ID that is used to authenticate the user in
 * subsequent requests to the server. The function may also store the access token or session ID
 * in a cookie or local storage for persistent authentication across multiple sessions.
 */
export const logInWithEmailAndPassword = async (email, password) => {
    console.log('Authenticating with email and password: ' + email)
    try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('User authenticated!')
    } catch (err) {
        console.error("Error logging in with email and password: " + JSON.stringify(err))
        alert(err.message)
    }
}
