import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContainer } from "../views/AppContainer/AppContainer";

import { useRecoilValue } from "recoil";
import { isAuth } from "../recoil/profile";

type PrivateRouteProps = {
  component: Function;
  [x: string]: any;
};
export const PrivateRoute = ({
  component: Component,
  ...props
}: PrivateRouteProps) => {
  const auth = useRecoilValue(isAuth);
  return (
    <Route
      {...props}
      render={(props) =>
        auth ? (
          <AppContainer>
            <Component {...props} />
          </AppContainer>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
