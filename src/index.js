import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import LoadingIndicator from "./components/common/loadingIndicator";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
});

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-info bar from appearing on mobile
  e.preventDefault();
  // Show the install prompt
  window.showInstallPrompt();
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <LoadingIndicator />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
