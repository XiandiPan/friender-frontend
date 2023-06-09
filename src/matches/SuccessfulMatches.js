import UserContext from "../auth/UserContext";
import { useEffect, useState, useContext } from "react";
import ProfileCardList from "../profiles/ProfileCardList";



function SuccessfulMatches({getSuccessful}){
  const { currentUser } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(
    function loadSuccessfulMatches() {
      async function getSuccessfulMatches() {

        const newMatches = await getSuccessful(currentUser.username);
        setMatches(newMatches);
        setIsLoading(false);
      }
      getSuccessfulMatches();
    },[]);

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <h1>Matches</h1>
      <ProfileCardList matches={matches}/>
    </div>
  );
}

export default SuccessfulMatches;