import { Container } from "@material-ui/core";
import BankDetails from "./BankDetails";
import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Favourite from "./Favourite";
import Controls from "./Controls";
import NotFoundPage from "./NotFoundPage";

const Main = () => {
  return (
    <Container>
      <HashRouter>
        <Switch>
          <Route exact path="/" >
            <Redirect to="/banks" />
          </Route>
          <Route exact path="/banks">
            <Controls />
          </Route>
          <Route path="/bank-details/:id">
            <BankDetails />
          </Route>
          <Route path="/favourites">
            <Favourite />
          </Route>
          <Route component={NotFoundPage}/>
        </Switch>
      </HashRouter>
    </Container>
  );
};

export default Main;
