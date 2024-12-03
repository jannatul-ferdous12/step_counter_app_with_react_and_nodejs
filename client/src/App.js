import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "./components/User";
import Add from "./components/Add";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Dashboard" component={User} />
        <Route exact path="/add" component={Add} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
