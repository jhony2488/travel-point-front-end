import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { RouteLayout } from "../Components";
import WithHeader from "../Layouts/WithHeader";
import {
  Home,
  Page404,
  SignUp,
  Login,
  Itineraries,
  MyItineraries,
  TravelTips,
  CreateItineraries,
  CreateTravelTips,
  ViewUnicItinerary
} from "../Pages";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <RouteLayout path="/home" exact component={Home} layout={WithHeader} />
        <RouteLayout
          path="/signup"
          exact
          component={SignUp}
          layout={WithHeader}
        />
        <RouteLayout
          path="/login"
          exact
          component={Login}
          layout={WithHeader}
        />
        <RouteLayout
          path="/itineraries"
          exact
          component={Itineraries}
          layout={WithHeader}
        />
        <RouteLayout
          path="/my-itineraries"
          exact
          component={MyItineraries}
          layout={WithHeader}
        />
        <RouteLayout
          path="/travel-tips"
          exact
          component={TravelTips}
          layout={WithHeader}
        />
        <RouteLayout
          path="/created-itineraries"
          exact
          component={CreateItineraries}
          layout={WithHeader}
        />
        <RouteLayout
          path="/created-travel-tips"
          exact
          component={CreateTravelTips}
          layout={WithHeader}
        />
        <RouteLayout
          path="/itinerary/:id"
          exact
          component={ViewUnicItinerary}
          layout={WithHeader}
        />
        <RouteLayout
          path="*"
          exact
          component={Page404}
          layout={WithHeader}
          isError404
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
