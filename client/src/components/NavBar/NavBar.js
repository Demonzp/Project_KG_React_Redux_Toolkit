import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import RouteNames from '../../constants/routeNames';
import useAuth from '../../hooks/useAuth';

import cssStyles from './navbar.module.css';

const NavBar = () => {
  const { authAttempted, user, signout } = useAuth();
  
  return (
    <nav className={cssStyles.navBar}>
      <h3>Project_KG</h3>
      <ul className={cssStyles.navLinks}>
        <Link className={cssStyles.navRefs} to={RouteNames.HOME}>
          <li>Homepage</li>
        </Link>
        {authAttempted ?
          <Fragment>
            {user ?
              <Fragment>
                <Link className={cssStyles.navRefs} to={RouteNames.EMPLOYEES}>
                  <li>Employees</li>
                </Link>
                <Link className={cssStyles.navRefs} to={RouteNames.HOME} onClick={signout}>
                  <li>SignOut</li>
                </Link>
              </Fragment> 
              :
              <Fragment>
                <Link className={cssStyles.navRefs} to={RouteNames.SIGNIN}>
                  <li>SignIn</li>
                </Link>
                <Link className={cssStyles.navRefs} to={RouteNames.SIGNUP}>
                  <li>SignUp</li>
                </Link>
              </Fragment>
            }
          </Fragment> :
          <div>Loading...</div>
        }
      </ul>
    </nav>
  );
};

export default NavBar;