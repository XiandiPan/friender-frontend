import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PotentialMatches from "../matches/PotentialMatches";
import SuccessfulMatches from "../matches/SuccessfulMatches";


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Visiting a non-existant route navigates to the homepage.
 */

function RoutesList({ login, signup, currentUser, getSuccessful, getPotential }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );

  return (
    <div className="pt-5">
      <Routes>
        {!currentUser &&
        <>
          <Route path="/login"element={<LoginForm login={login} />} />
          <Route path="/signup"element={<SignupForm signup={signup} />} />
        </>
        }

        <Route path="/"element={<Homepage />} />

        {currentUser &&
        <>
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/potential" element={<PotentialMatches getPotential={getPotential}/>} />
          <Route path="/successful" element={<SuccessfulMatches getSuccessful={getSuccessful}/>} />

        </>
      }

        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default RoutesList;
