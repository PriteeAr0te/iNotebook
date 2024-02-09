import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // replacing useHistory hook in v5 with useNavigate
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://inotebook-backend-sljt.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      // console.log(json)
      if (json.success) {
        //redirect
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Login Successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid Username or Password", "danger");
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
      <form className="form mx-auto" onSubmit={handleSubmit}>
        <h2 className="form-title text-center">Login To Continue iNotebook</h2>
        <div className="mb-3 mt-4">
          <label className="form-label fw-semibold" htmlFor="email">
            {" "}
            <i className="fa-regular fa-envelope mr-2"></i> Email address
          </label>
          <input
            type="email"
            className="form-control mt-2"
            onChange={onChange}
            value={credentials.email}
            name="email"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label mt-2" htmlFor="password">
            <i class="fa-solid fa-lock"></i> Password
          </label>
          <input
            type="password"
            className="form-control mt-2"
            onChange={onChange}
            value={credentials.password}
            name="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn button my-3 mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
