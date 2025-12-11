import React from "react";
import axios from "axios"
import { useState } from "react";



const Login = () => {
const [emailid , setemailid] = useState('admin@test.com')
  const [password , setpassword] = useState('admin@123&78')
   const handleEmail = (e) => setemailid(e.target.value);
const handlePassword = (e) => setpassword(e.target.value);
  
const onSubmit=()=>{
    


axios.post('http://localhost:5000/admin',{
emailid,password

})

.then(res =>{

console.log(res.data)
alert(res.data.message)

})

.catch(error=>{
 console.log(error.response?.data || error.message)


})

  }




  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className=" p-5 bg-white shadow rounded-4" style={{ width: "450px" }}>
        
        <h4 className="text-center text-primary mb-4">Admin Login</h4>

        <div className="mb-3">
          <label className="form-label text-primary">Enter Your Email</label>
          <input type="email" onChange={handleEmail}  value={emailid}className="form-control border-primary" />
        </div>

        <div className="mb-4">
          <label className="form-label text-primary">Enter Your Password</label>
          <input type="password" onChange={handlePassword} value={password} className="form-control border-primary" />
        </div>

        <div className="text-center">
          <button   onClick ={onSubmit}type="button" className=" btnsubmit btn btn-primary px-4 py-2">
            Login
          </button><br/>
          <span className="text-primary">Demo credentials are auto-loaded. Just click Login to proceed.</span>
        </div>

      </div>
    </div>
  );
};

export default Login;
