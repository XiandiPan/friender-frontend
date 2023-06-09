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

function ProfileCardList({matches, isSuccessful}) {
  console.debug("ProfileList");
  const [profiles, setProfiles] = useState(matches)

  function removeProfileCard(id){
    console.log("id=",id, "profiles=", profiles)
    setProfiles((prevProfiles) => prevProfiles.filter((profile)=>profile.matchId !== id))
  }

  if (!profiles) return <LoadingSpinner />;

  return (
    <div className="ProfileList col-md-8 offset-md-2">
      {profiles.length
        ? (
          <div className="ProfileList-list">
            {profiles.map((m,idx) => (<div key={m.matchId} style={{zIndex:idx}}>
              <ProfileCard
            remove={removeProfileCard} match={m} isSuccessful={isSuccessful}/>
            </div>))}
          </div>
        ) : (
          <p className="no-results">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default ProfileCardList;
