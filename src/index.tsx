import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { api } from "./api";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { handleRefreshToken } from "./utils/networkUtils";
// import { RecoilRoot, useRecoilSnapshot } from "recoil";
import "./i18n";

handleRefreshToken();
api.configure(process.env.REACT_APP_API_URL || "");

ReactDOM.render(
  <React.StrictMode>
    {/* <RecoilRoot> */}
      {/* <React.Suspense fallback='loading'> */}
        <ColorModeScript />
        <App />
      {/* </React.Suspense> */}
    {/* </RecoilRoot> */}
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
