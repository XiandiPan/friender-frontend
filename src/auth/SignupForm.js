import React, { useState } from "react";
import Alert from "../common/Alert";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "apple2",
    password: "apple",
    firstName: "apple",
    lastName: "pan",
    email: "apple@gmial.com",
    image:"",
    zip: "29681",
    hobbies: "run",
    interest: "jump"
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=", typeof signup,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/companies")
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">First name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">zip</label>
                <input

                  name="zip"
                  className="form-control"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hobbies</label>
                <input
                  name="hobbies"
                  className="form-control"
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Interest</label>
                <input

                  name="interest"
                  className="form-control"
                  value={formData.interest}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
              }

              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;