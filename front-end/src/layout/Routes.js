import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservation/NewReservation";
import NewTable from "../tables/NewTables";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import SearchReservation from "../search/SearchReservation";
import EditReservation from "../reservation/EditReservation";
import SeatReservation from "../reservation/SeatReservation";
//import { useParams } from "react-router";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  //const { date } = useParams();
  //console.log(date)
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/search">
        <SearchReservation />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
