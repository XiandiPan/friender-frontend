// import React from "react";
// import { Link } from "react-router-dom";



// /** Show limited information about a company
//  *
//  * Is rendered by CompanyList to show a "card" for each company.
//  *
//  * CompanyList -> CompanyCard
//  */
// function ProfileCard({ username, firstName, lastName, email, hobbies, interests, image}) {
//   console.debug("ProfileCard");

//   // const { hasAppliedToJob, applyToJob } = useContext(UserContext);
//   const { like, notLike } = useContext(UserContext);
//   const [applied, setApplied] = useState();
//   // const [applied, setApplied] = useState();

//   React.useEffect(
//     function updateAppliedStatus() {
//       console.debug("ProfileCard useEffect updateAppliedStatus", "id=", id);

//       setApplied(hasAppliedToJob(id));
//     },
//     [id, hasAppliedToJob]
//   );

//   /** Apply for a job */
//   async function handleApply(evt) {
//     if (hasAppliedToJob(id)) return;
//     applyToJob(id);
//     setApplied(true);
//   }

//   return (
//     <div className="ProfileCard card">
//       {" "}
//       {applied}
//       <div className="card-body">
//         <h6 className="card-title">{title}</h6>
//         <p>{companyName}</p>
//         {salary && (
//           <div>
//             <small>
//               Salary: {"$" + Intl.NumberFormat("en-US").format(salary)}
//             </small>
//           </div>
//         )}
//         {equity !== undefined && (
//           <div>
//             <small>Equity: {equity}</small>
//           </div>
//         )}
//         <button
//           className="btn btn-danger fw-bold text-uppercase float-end"
//           onClick={handleApply}
//           disabled={applied}
//         >
//           {applied ? "Applied" : "Apply"}
//         </button>
//       </div>
//     </div>
//   );
// }


// export default ProfileCard;

// function ProfileCard( { username, firstName, lastName, email, hobbies, interests, image}) {
//   console.debug("ProfileCard", image);

//   return (
//     <Link className="ProfileCard card" to={`/potential/${username}`}>
//       <div className="card-body">
//         <h6 className="card-title">
//           {username}
//           {image && <img src={image}
//             alt={username}
//             className="float-end ms-5" />}
//         </h6>

//         <p><small>{firstName}</small></p>
//         <p><small>{lastName}</small></p>
//         <p><small>{email}</small></p>
//         <p><small>{hobbies}</small></p>
//         <p><small>{interests}</small></p>
//       </div>
//     </Link>
//   );
// }

// export default ProfileCard;
