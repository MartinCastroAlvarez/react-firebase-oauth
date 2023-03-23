# React Firebase Oauth 2.0
React application implementing Oauth 2.0 with Firebase

![wallpaper.jpg](./wallpaper.jpg)

## References

- [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize)
- [Get Started with Firebase Authentication on Websites](https://firebase.google.com/docs/auth/web/start?hl=es-419)
- [Vite Getting Started](https://vitejs.dev/guide/)
- [Firebase Google authentication with React](https://dev.to/mdamirgauhar/firebase-google-authentication-with-react-gop)
- [Handling user authentication with Firebase in your React apps](https://blog.logrocket.com/user-authentication-firebase-react-apps/)

## Architecture

|File|Description|
|---|---|
|[src/App.jsx](src/App.jsx)|Main application hook.|
|[src/Fire.jsx](src/Fire.jsx)|Firebase configuration file.|
|[src/layout/Nav.jsx](src/layout/Nav.jsx)|Navigation bar component.|
|[src/layout/Loading.jsx](src/layout/Loading.jsx)|Loading message.|
|[src/views/Home.jsx](src/views/Home.jsx)|Home view.|
|[src/views/Login.jsx](src/views/Login.jsx)|Login view.|
|[src/views/SignUp.jsx](src/views/SignUp.jsx)|Sign up view.|

## Instructions

#### Install the dependencies

````bash
cd react-firebase-oauth
npm install
````

#### In the [Firebase console](https://console.firebase.google.com/u/0/?pli=1), add a project.

![provider.png](./provider.png)

#### In the [Firebase console](https://console.firebase.google.com/u/0/?pli=1), update the list of authorized domains.

![domains.png](./domains.png)

#### In the [Firebase console](https://console.firebase.google.com/u/0/?pli=1), look at the settings of your project

![settings.png](./settings.png)

#### Set the following environment variables

```bash
export FIREBASE_PROJECT_ID="nisman-464ff"
export FIREBASE_API_KEY="AIzaSyBnEERUNiBattmkurwJw0bU7TcWSTiHP5o"
export FIREBASE_AUTH_DOMAIN="nisman-464ff.firebaseapp.com"
export FIREBASE_STORAGE_BUCKET="nisman-464ff.appspot.com"
export FIREBASE_MESSAGING_SENDER_ID="836894511184"
export FIREBASE_APP_ID="1:836894511184:web:def52338e409c23e618155"
```

#### Start the app
```bash
npm run dev
```

#### Visit the [home page](http://127.0.0.1:5173/)

![home.png](./home.png)

#### Visit the [login page](http://127.0.0.1:5173/login)

![login.png](./login.png)

#### Validate you are authenticated now

![authenticated.png](./authenticated.png)
