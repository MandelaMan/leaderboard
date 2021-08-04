import React, { Component, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Dashboard {...props} test={1} />}
          />
          {/* <Route exact path="/" component={Dashboard} /> */}
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
