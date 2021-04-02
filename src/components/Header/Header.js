import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/main-logo12.png'
import { UserContext } from '../../App';
import firebase from "firebase/app";
import 'firebase/auth';
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then((res) => {
                setLoggedInUser({});
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark ">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} className="rounded " width="50px" height="55px" alt="" />
                </Link>

                <ul>
                    <div class="navbar" id="myTopnav">
                        <li className="nav-item active">
                            <Link to="/Home" className="nav-link">
                                <button className="btn btn-secondary btn-rounded"> Home </button>
                                </Link>
                        </li>

                        <li className="nav-item active">
                            <Link to="/Orders" className="nav-link">
                            <button className="btn btn-info btn-rounded"> Orders </button>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/Admin" className="nav-link">
                                <button className="btn btn-secondary btn-warning"> Admin </button>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/checkout/:id" className="nav-link">
                                <button className="btn btn-success btn-rounded"> Checkout </button>
                            </Link>
                        </li>

                        
                    <li className="nav-item">
                        {loggedInUser.email ? (
                            <Link to="/" onClick={handleSignOut} className="nav-link">
                                <img src={loggedInUser.photoURL} className="rounded-circle" width="45px"  alt=""/>
                            </Link>
                        ) : (
                            <Link to="/login" className="nav-link">
                                <button className="btn btn-danger btn-rounded"> Login </button>
                            </Link>
                        )}
                    </li>

                    </div>
                </ul>

            </div>
        </nav>
    );
};

export default Header;