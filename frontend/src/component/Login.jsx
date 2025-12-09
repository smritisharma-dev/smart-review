import React from "react";


const Login = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className=" p-5 bg-white shadow rounded-4" style={{ width: "450px" }}>
        
        <h4 className="text-center text-primary mb-4">Admin Login</h4>

        <div className="mb-3">
          <label className="form-label text-primary">Enter Your Email</label>
          <input type="email" className="form-control border-primary" />
        </div>

        <div className="mb-4">
          <label className="form-label text-primary">Enter Your Password</label>
          <input type="password" className="form-control border-primary" />
        </div>

        <div className="text-center">
          <button type="submit" className=" btnsubmit btn btn-primary px-4 py-2">
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
