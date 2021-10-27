import { Fragment } from "react";
import { Link } from "react-router-dom";
import RouteNames from "../../constants/routeNames";

import cssStyles from './navbar.module.css';

const NavBar = () => {
  const authAttempted = true;
  const user = null;

  return (
    <nav className={cssStyles.nav}>
      <h3>Project_KG</h3>
      <ul className={cssStyles.navLinks}>
        <Link className={cssStyles.navRefs} to={RouteNames.HOME}>
          <li>Homepage</li>
        </Link>
        {authAttempted ?
          <Fragment>
            {user ?
              <Fragment>
                {/* <Link className={cssStyles.navRefs} to={RouteNames.employees}>
                  <li>Employees</li>
                </Link> */}
                <Link className={cssStyles.navRefs} to={RouteNames.HOME}>
                  <li>SignOut</li>
                </Link>
              </Fragment> :
              null
            }
            {!user ?
              <Fragment>
                <Link className={cssStyles.navRefs} to={RouteNames.SIGNIN}>
                  <li>SignIn</li>
                </Link>
                <Link className={cssStyles.navRefs} to={RouteNames.SIGNUP}>
                  <li>SignUp</li>
                </Link>
              </Fragment> :
              null
            }
          </Fragment> :
          <div>Loading...</div>
        }
      </ul>
    </nav>
  );
};

export default NavBar;