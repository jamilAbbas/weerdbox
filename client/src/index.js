import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import jwt_decode from "jwt-decode";

import app from "./rootReducer";
import NavigationBar from "./containers/NavigationBar";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import PrivateRoute from "./commons/PrivateRoutes";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import About from "./containers/About";
import Rules from "./containers/Rules";
import Dashboard from "./containers/Dashboard";
import { setCurrentUser } from "./containers/Login/actions";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  app,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.getItem("jwtToken"));
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(setCurrentUser({}));
    localStorage.removeItem("jwtToken");
    window.location.replace("/login");
  }
}
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <NavigationBar />
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route path="/rules" component={Rules} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
