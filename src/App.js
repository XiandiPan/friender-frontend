import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import LoadingSpinner from "./common/LoadingSpinner";
import FrienderApi from "./api/api";
import UserContext from "./auth/UserContext";
import decode from "jwt-decode";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "friender-token";

/** Jobly application.
 *
 * - applicationIds: for logged in users, this is a set of application Ids
 *   for applied jobs.
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app,
 *   infoLoaded: has user data been pulled from API?
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *
 * App -> Routes
 */

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "applicationIds=",
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decode(token);
            // put the token on the Api class so it can use it to call the API.
            FrienderApi.token = token;
            let currentUser = await FrienderApi.getCurrentUser(username);

            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });

          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {

    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function signup(signupData) {
    let token = await FrienderApi.signup(signupData);
    setToken(token);
  }

  /** Handles site-wide login.
   *
   * Logs in a user
   *
   * Make sure you await this function to see if any error happens.
   */
  async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
  }

  async function getPotentialMatches(username) {

    let potential = await FrienderApi.getAllPotentialMatch(username);
    return potential;

  }
  async function getSuccessfulMatches(username) {

    let successful = await FrienderApi.getAllSuccessfulMatch(username);
    return successful;
  }




  if (!currentUser.infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser
      }}
    >
      <div className="App">
        <Navigation logout={logout} />
        <RoutesList currentUser={currentUser.data} login={login} signup={signup}
         getSuccessful={getSuccessfulMatches} getPotential={getPotentialMatches} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
