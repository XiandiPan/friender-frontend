import UserContext from "../auth/UserContext";
import React from "react";
import { useContext, useState, useEffect } from "react";
import ProfileCardList from "../profiles/ProfileCardList";



function PotentialMatches({ getPotential }) {
  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("currentUser=====", currentUser.username);


  useEffect(
    function loadPotentialMatches() {
      async function getPotentialMatches() {

        const newMatches = await getPotential(currentUser.username);
        console.log("=========matches", newMatches);
        setMatches(await getPotential(currentUser.username));
        setIsLoading(false);
      }
      getPotentialMatches();
    }
    , []);
  console.log("match============", matches);
  // if (!currentUser.infoLoaded) return <LoadingSpinner />;
  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <h1>Find a friend</h1>
      <ProfileCardList matches={matches}/>
      {/* <ul>{matches.map(match => <li>{match.matchId}</li>)}</ul> */}

    </div>
  );
}

export default PotentialMatches





