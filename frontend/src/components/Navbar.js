// import React from "react";
// import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
// import logo from "../images/logo.png"
// import homephoto from "../images/homepage5.jpg"

// // import LogoImage from "
// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-transparent">
//       <div className="flex items-center justify-between  bg-transparent p-4">
//         <div className="flex items-center">
//           <img src={logo} alt="Logo" className="h-10 bg-transparent" /> 
//           <h1 className="ml-2 text-4xl font-bold font-sans  tracking-wide decoration-wavy">
//           {/* <span style={{ color: "green" }}>F</span>oodZilla */}
//           <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>odZilla
//             </h1>
//         </div>
//         <ul className="flex">
//           <li className="mr-4 text-2xl">
//             <Link to="/Login">Login</Link>
//           </li>
//           <li className="mr-4 text-2xl">
//             <Link to="/Register">Register</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };


// export default Navbar


import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../images/logo.png";
import image from "../images/image.png";
import { authService } from "../services/authServices.js";


const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const isLoggedIn = authService.isLoggedIn();

  const handleLogout = () => {
    authService.logOut();
    navigate("/Login"); // Navigate to Login page after logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent">
      <div className="flex items-center justify-between custom-bg-color p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 bg-transparent" />
          <h1 className="ml-2 text-4xl font-bold font-sans tracking-wide decoration-wavy">
            <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>odZilla
          </h1>
        </div>
        <ul className="flex">
          {isLoggedIn ? (
            <>
              <li className="mr-4 text-2xl">
                <button type="button" onClick={handleLogout}>
                   Logout
                </button>
              </li>
              <li className="mr-4 text-2xl">
              <Link to="/userProfile" onClick={() => navigate('/userProfile')}>User Profile</Link>

              </li>
            </>
          ) : (
            <>
              <li className="mr-4 text-2xl">
                <Link to="/Login">Login</Link>
              </li>
              <li className="mr-4 text-2xl">
                <Link to="/Register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


