import React, { useContext, useState } from 'react';
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from "./FirebaseConfig";
import logo from '../Images/Group 573.png'
import "./Login.css";

const Login = () => {
    document.title = "Car House - Login";
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const { displayName, email,photoURL } = result.user;
            const signedInUser = { name: displayName, email,photoURL }
            console.log(result);
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    return (
        <div className="login-form">
            <div className="google-btn d-flex justify-content-center align-items-center">
                <button className="btn btn-social" onClick={handleGoogleSignIn}>
                    <img className="social-logo" src={logo} alt="google" />
							Log In
						</button>
            </div>
        </div>
    );
};

export default Login;