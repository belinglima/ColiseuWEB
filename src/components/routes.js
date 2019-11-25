import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

import Evaluation from './evaluation'
import Evaluations from './evaluations'
import Step0 from './step0'
import Users from './users'
import EditUser from './editUser'
import Company from './company'
import Home from './home'
import Login from "./login";
import App from './app';

import Sistema from './sistema/app';
import AddUser from "./addUser";
import Step01 from "../step01";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Menu = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/company" component={Company} />

      <PrivateRoute exact path="/evaluations" component={Evaluations} />
      <PrivateRoute exact path="/evaluation" component={Evaluation} />
      <PrivateRoute exact path="/evaluation00/:id" component={Step0} />
      <PrivateRoute exact path="/evaluation01/:id" component={Step01} />

      <PrivateRoute exact path="/users" component={Users} />
      <PrivateRoute exact path="/addUser" component={AddUser} />
      <PrivateRoute exact path="/editUser/:id" component={EditUser} />


      <PrivateRoute exact path="/sistema" component={Sistema} />
      <PrivateRoute exact path="/addAcademia" component="" />
      {/* pagina de erro */}
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Menu;