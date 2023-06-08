import UserContext from "../auth/UserContext";
import { useContext } from "react";



function SuccessfulMatches({getSuccessful}){
  const { currentUser } = useContext(UserContext);

  const matches = getSuccessful(currentUser.username)
  return (
    <div>
      <h1>Friendship</h1>

    </div>
  )
}

export default SuccessfulMatches;