import RouteMiddlewares from './constants/routeMiddlewares';
import RouteNames from './constants/routeNames';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export const routes = [
  {
    path: RouteNames.HOME,
    exact: true,
    name: "Home",
    component: Home,
    layout: "",
    middelware:RouteMiddlewares.ALL,
  },
  {
    path: RouteNames.SIGNIN,
    name: "Signin",
    component: Signin,
    layout: "",
    middelware:RouteMiddlewares.GUEST,
  },
  {
    path: RouteNames.SIGNUP,
    name: "Signup",
    component: Signup,
    layout: "",
    middelware:RouteMiddlewares.GUEST,
  },
];