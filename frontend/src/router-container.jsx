import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
export class RouterContainer extends Component {
  render() {
      return (
        <Router history={history}>
            <Switch>
                  <Route exact path='/' component={Search} />
                  <Route exact path='/results' component = {Results} />
            </Switch>
        </Router>
      );
  }
}

export default RouterContainer
