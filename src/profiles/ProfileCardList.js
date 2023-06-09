import React, { useState, useEffect, useContext } from "react";
import FrienderApi from "../api/api";
import ProfileCard from "./ProfileCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of user profile
 *
 * On mount, loads users from API.
 * Re-loads filtered users on submit
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function ProfileCardList({matches}) {
  console.debug("ProfileList");
  const [profiles, setProfiles] = useState(matches)

  function removeProfileCard(id){
    console.log("id=",id, "profiles=", profiles)
    setProfiles((prevProfiles) => prevProfiles.filter((profile)=>profile.matchId !== id))
  }

  if (!matches) return <LoadingSpinner />;

  return (
    <div className="ProfileList col-md-8 offset-md-2">
      {matches.length
        ? (
          <div className="ProfileList-list">
            {matches.map(m => (<ProfileCard key={m.matchId}
            remove={removeProfileCard} match={m}/>))}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default ProfileCardList;
