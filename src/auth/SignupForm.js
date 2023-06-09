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
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    zip: "",
    interests: "",
    hobbies: ""
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
      navigate("/");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  function handleImageChange(evt) {
    const { name } = evt.target;
    setFormData(data => ({ ...data, [name]: evt.target.files[0] }));
  };

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <label className="form-label">Interests</label>
                <input

                  name="interests"
                  className="form-control"
                  value={formData.interests}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label btn btn-primary" htmlFor="img">Upload an image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  id="img"
                  style={{display:"none"}}
                  value=""
                  onChange={handleImageChange}
                />
                <p className ="form-control" style={{display:"inline"}}>{formData.image.name}</p>
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