import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import FrienderApi from "../api/api";
import UserContext from "../auth/UserContext";



/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */
function ProfileCard({ match, remove }) {
  console.debug("ProfileCard");

  const { currentUser, dislikeMatch, likeMatch } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getProfile() {
    let fetchedProfile = null;
    async function fetchUserProfile(){
        if(match.userUserName1 === currentUser.username){
          fetchedProfile = (await FrienderApi.getUser(match.userUserName2));
        }else{
          fetchedProfile = (await FrienderApi.getUser(match.userUserName1));
        }
      setProfile(fetchedProfile)
      setIsLoading(false);
    }
    fetchUserProfile();
  },[]);

  function like(){
    console.log("match liked=",match)
    remove(match.matchId)
    likeMatch(currentUser.username, match.matchId)
  }

  function dislike(){
    console.log("match disliked=",match)
    remove(match.matchId)
    dislikeMatch(match.matchId)
  }

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div className="ProfileCard card">
      <div className="card-body">
        <button onClick={dislike}> Dislike </button>
          <div>
            <p>{profile.username}</p>
          </div>
        <button onClick={like}> Like </button>
      </div>
    </div>
  );
}


export default ProfileCard;

