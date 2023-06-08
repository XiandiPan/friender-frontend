import React, { useState, useEffect } from "react";
import FrienderApi from "../api/api";
import ProfileCard from "./profile/ProfileCard";
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

  const [profiles, setProfiles] = useState(null);

  useEffect(function getProfilesOnMount() {
    console.debug("ProfileList useEffect getProfilesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads profiles. */
  async function search(username) {
    let profiles = await FrienderApi.getProfiles(username);
    setProfiles(profiles);
  }

  if (!profiles) return <LoadingSpinner />;

  return (
    <div className="ProfileList col-md-8 offset-md-2">
      {profiles.length
        ? (
          <div className="ProfileList-list">
            {profiles.map(p => (
              <ProfileCard
                key={p.username}
                username={p.username}
                firstName={p.firstName}
                LastName={p.LastName}
                image={p.image}
                hobbies={p.hobbies}
                interests={p.interests}
                zip={p.zip}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default ProfileCardList;
