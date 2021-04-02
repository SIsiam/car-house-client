import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import AddCar from './components/Admin/AddCar';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/Home">
            <Home></Home>
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/checkout/:id">
            <Checkout />
          </PrivateRoute>

          <PrivateRoute path="/Orders">
            <Orders />
          </PrivateRoute>

          <Route exact path="/">
            <Home></Home>
          </Route>

          <PrivateRoute path="/Admin">
            <Admin />
          </PrivateRoute>

          <Route path='/AddCar'>
            <AddCar />
          </Route>

          <Route exact path="*">
            <h1> Opps Sorry! Enter Valid Page</h1>
          </Route>
          
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
