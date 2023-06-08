import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">Friender</h1>
        <p className="lead">Friendship is the only cement that will ever hold the world together</p>
        {currentUser
          ? <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
          : (
            <p>
              <Link className="btn btn-primary fw-bold me-3"
                to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary fw-bold"
                to="/signup">
                Sign up
              </Link>
              
            </p>
          )}
      </div>
    </div>
  );
}

export default Homepage;
