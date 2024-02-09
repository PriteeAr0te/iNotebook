import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const BASE_URL = "https://inotebook-backend18052.onrender.com";
  const [credentials, setCredentials] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, confirmPassword } = credentials;

    // Check if passwords match
    if (password !== confirmPassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      // Sending signup request
      const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${fname} ${lname}`,
          email,
          password,
          confirmPassword,
        }),
      });

      const json = await response.json();
      // console.log(json);

      // Handle response
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Your Account Created Successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Something went wrong! Please Try Again.", "danger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <form className="form mx-auto" onSubmit={handleOnSubmit}>
        <h2 className="form-title text-center">
          Create an account to use iNotebook
        </h2>
        <div className="mb-3 mt-4">
          <input
            type="text"
            name="fname"
            onChange={onChange}
            id="fname"
            className="my-3 form-control"
            placeholder="First name"
            aria-label="First name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="lname"
            onChange={onChange}
            id="lname"
            className="my-3 form-control"
            placeholder="Last name"
            aria-label="Last name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChange}
            id="email"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onChange}
            id="password"
            placeholder="Enter Password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={onChange}
            id="confirmPassword"
            placeholder="Confirm Password"
            minLength={5}
            required
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={onChange}
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I accept the Terms of Use & Privacy Policy
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn button my-3">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
