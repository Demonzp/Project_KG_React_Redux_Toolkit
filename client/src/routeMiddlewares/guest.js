import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import RouteNames from '../constants/routeNames';

const GuestRoute = ({component:Component, ...rest})=> {

  const authAttempted = true;
  const user = null;

  return (
    <Route
      children={({ location }) => (
      authAttempted
      ?
      (
        !user
        ?
        <Component {...rest}/>
        :
        <Redirect
          to={{
            pathname: RouteNames.SIGNIN,
            state: { from: location }
          }}
        />
      )
      :
      <di>Loading...</di>
      )}
    />
  );
}

export default GuestRoute;