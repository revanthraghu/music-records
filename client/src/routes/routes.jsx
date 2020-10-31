import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import { useSelector } from 'react-redux';
import AccountInfo from '../components/AccountInfo';

function Routes() {
    const { authToken, isRegistered } = useSelector((state) => state);
    return (
        <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
                exact
                path="/login"
                render={() => (authToken ? <Redirect to="/" /> : <Login />)}
            />
            <Route
                exact
                path="/register"
                render={() =>
                    isRegistered && !authToken ? (
                        <Redirect to="/login" />
                    ) : authToken ? (
                        <Redirect to="/" />
                    ) : (
                        <Register />
                    )
                }
            />
            <Route
                exact
                path="/account"
                render={() =>
                    authToken ? <AccountInfo /> : <Redirect to="/login" />
                }
            />
        </Switch>
    );
}

export default Routes;
