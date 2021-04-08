import React, { Fragment } from "react";
import ServiceAdd from "./components/ServiceAdd";
import ServiceList from "./components/ServiceList";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Fragment>
          <Redirect from="/" to="/services" />

          <Route exact path="/services" component={ServiceList} />
          <Route path="/services/:id" component={ServiceAdd} />
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;