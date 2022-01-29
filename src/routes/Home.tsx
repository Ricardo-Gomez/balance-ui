import * as React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuth } from "../recoil/profile";

const Home = () => {
  const user = useRecoilValue(isAuth);
  console.log(user);
  const url = isAuth ? "/dashboard" : "/login";
  return <Redirect to={url} />;
};

export default Home;
