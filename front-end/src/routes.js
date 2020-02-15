import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

import NotFound from './pages/NotFound';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Main} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}