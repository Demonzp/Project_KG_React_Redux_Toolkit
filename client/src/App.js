import React from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import RouteMiddlewares from './constants/routeMiddlewares';
import { routes } from './routes';
import GuestRoute from './routeMiddlewares/guest';
import AuthRoute from './routeMiddlewares/auth';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AppAlerts from './components/AppAlerts';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <AppAlerts />
        <Switch>
          {routes.map((route, key) => {
            switch (route.middelware) {
              case RouteMiddlewares.ALL:
                return (
                  <Route
                    exact={route.exact || false}
                    path={route.path}
                    component={route.component}
                    key={key}
                  />
                );
              case RouteMiddlewares.GUEST:
                return (
                  <GuestRoute
                    exact={route.exact || false}
                    path={route.path}
                    component={route.component}
                    key={key}
                  />
                );
              case RouteMiddlewares.AUTH:
                return (
                  <AuthRoute
                    exact={route.exact || false}
                    path={route.path}
                    component={route.component}
                    key={key}
                  />
                );
              default:
                return null;
            }
          })}
          <div>Page not found, 404!</div>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
