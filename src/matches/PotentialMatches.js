import UserContext from "../auth/UserContext";
import React from "react";
import { useContext, useState, useEffect } from "react";
import ProfileCardList from "../profiles/ProfileCardList";



function PotentialMatches({ getPotential }) {
  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(
    function loadPotentialMatches() {
      async function getPotentialMatches() {

        const newMatches = await getPotential(currentUser.username);
        setMatches(newMatches);
        setIsLoading(false);
      }
      getPotentialMatches();
    },[]);

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <h3>Find a friend</h3>
      <ProfileCardList matches={matches} isSuccessful={false}/>
    </div>
  );
}

export default PotentialMatches





