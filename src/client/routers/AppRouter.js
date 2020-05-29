import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Header from "../components/Header";
import NotFound from "../pages/NotFound";
import StreamList from "../pages/StreamList";
import StreamCreate from "../pages/StreamCreate";
import StreamEdit from "../pages/StreamEdit";
import StreamDelete from "../pages/StreamDelete";
import StreamShow from "../pages/StreamShow";
import history from "../history";

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      {/* switch shows only the matched route */}
      <Switch>
        <Route path="/" exact component={StreamList} />

        <Route path="/login" component={Login} />
        <Route path="/streams/new" exact component={StreamCreate} />
        <Route path="/streams/edit/:id" exact component={StreamEdit} />
        <Route path="/streams/delete/:id" exact component={StreamDelete} />
        <Route path="/streams/:id" exact component={StreamShow} />
        {/* we put "exact" here otherwise it would render /new and /:id together. because : means any variable, so new will be a variable */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
//edit/:id  :id means variable
export default AppRouter;

// <Route to="not-found" />
