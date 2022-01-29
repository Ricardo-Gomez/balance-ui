import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AppContainerWithLoader } from "../views/AppContainer/AppContainer";

const Login = React.lazy(() => import("../views/Auth/Login"));
const Home = React.lazy(() => import("./Home"));
const Dashboard = React.lazy(() => import("../views/Dashboard"));

export const Routes = () => (
  <Switch>
    <React.Suspense fallback={<AppContainerWithLoader />}>
      <Route key='login' path='/login' exact component={Login} />
      <Route key='home' path='/' exact component={Home} />
      <PrivateRoute path='/dashboard' exact component={Dashboard} />
    </React.Suspense>
  </Switch>
);
