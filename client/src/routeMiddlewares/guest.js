import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import RouteNames from '../constants/routeNames';
import useAuth from '../hooks/useAuth';

const GuestRoute = ({component:Component, ...rest})=> {
  const { authAttempted, user } = useAuth();

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
            pathname: RouteNames.HOME,
            state: { from: location }
          }}
        />
      )
      :
      <div>Loading...</div>
      )}
    />
  );
}

export default GuestRoute;