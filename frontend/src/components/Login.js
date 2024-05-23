// // Import React and necessary hooks
// import React, { useEffect, useState } from "react";
// import Register from "./Register";
// import { BrowserRouter, Link, Router, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { authService } from "../services/authServices";
// // Functional component for the login portal
// const Login = () => {
//   // State to manage email and password input values
//   const [islogin, setLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // Function to handle login button click
//   const navigate = useNavigate();
//   // Function to handle register button click
//   useEffect(() => {
//     handleLogin();
//   }, []);
//   const handleLogin = async () => {
//     try {
//       const userData = { email, password };
//       const response = axios.post("http://localhost:8001/api/login", userData);
//       const user = (await response).data.user.role;
//       const token = (await response).data.token;
//       const userid = (await response).data.user.phone;
//       console.log(user);
//       console.log((await response).data.user);
//       if (token) {
//         console.log("login");
//         authService.setToken(token);
//         if (user === "admin") {
//           navigate("/admin");
//         }
//         if (user === "user") {
//           navigate("/Restorent");
//         }
//         if (user === "owner") {
//           navigate(`/ResDetails/${userid}`);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="Login  bg-red-500 my-20 ">
//       <h1 className="text-4xl">User Login Portal</h1>
//       {/* Email input */}
//       <label className="mr-2">Email</label>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       {/* Password input */}
//       <br></br>
//       <br></br>
//       <label className="mr-2">Password</label>
//       <input className="mr-2 "
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br></br>
//       <br></br>
//       {/* Login button */}
//       <button onClick={handleLogin}>Login</button>

//       {/* Register button */}
//       <Link to="/Register">
//         <button>Register</button>
//       </Link>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await axios.post("http://localhost:8001/api/login", userData);
      const user = response.data.user.role;
      const token = response.data.token;
      const userid = response.data.user.phone;
      if (token) {
        authService.setToken(token);
        if (user === "admin") {
          navigate("/admin");
        } else if (user === "user") {
          navigate("/Restorent");
        } else if (user === "owner") {
          navigate(`/ResDetails/${userid}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-8">User Login Portal</h1>
      <div className="bg-slate-700 p-6 rounded-lg shadow-md w-80">
        {/* Email input */}
        <label className="block mb-2">Email</label>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password input */}
        <label className="block mb-2">Password</label>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Login button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        {/* Register button */}
        <Link to="/Register" className="mt-4 block text-center">
          <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

