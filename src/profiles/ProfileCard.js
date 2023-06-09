import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import FrienderApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./ProfileCard.css"



/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */
function ProfileCard({ match, remove, isSuccessful }) {
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
    <div className="cardWrapper">
      {!isSuccessful && <button id="dislike-btn" className="btn btn-danger" onClick={dislike}> Dislike </button>}
      <div className="ProfileCard card">
          <div className="card-body">
            <div>
              <p><b>{profile.firstName} {profile.lastName}</b></p>
              {profile.imgUrl &&
              <img className="profile-image" src={profile.imgUrl} alt={`${profile.username}`}/>
              }
              <p>Hobbies: {profile.hobbies}</p>
              <p>Interests: {profile.interests}</p>
              {isSuccessful && <button id="like-btn" className="btn btn-success"> Send a message </button>}
            </div>
          </div>
      </div>
      {!isSuccessful && <button id="like-btn" className="btn btn-primary" onClick={like}> Like </button>}
    </div>

  );
}


export default ProfileCard;

