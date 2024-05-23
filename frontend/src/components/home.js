// import React from "react";
// import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
// import logo from "../images/logo.png"
// import homephoto from "../images/pexels-chanwalrus-958545.jpg"

// const HomePage = () => {
//     return (
//       <div>
//         <div className="h-20">
//       <div className="">
//         <div className="flex">
//           <div className="flex-1">
//             <div className="my-8 mx-auto max-w-4xl text-center">
//               <h2 className="text-3xl font-bold mt-40 mr-60 ">
//                 Welcome to   <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>odZilla
//                 </h2>
//               <p className=" mr-40  text-4xl">Explore our delicious menu and enjoy great discounts.</p>
//               {/* Other text content */}
//               <div>
//                 <p>Hemant </p>
//               </div>
//               <div>
//                 <p>Hemant </p>
//               </div>
  
//             </div>
//           </div>
//           <div className="flex-1 flex justify-end">
//             <img src={homephoto} alt="Home Pagelogo" className="w-full max-w-xs md:max-w-sm lg:max-w-lg rounded-lg shadow-lg mb-4 mt-40" />
//           </div>
//         </div>
//         </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default HomePage;
  
import React from "react";
import homephoto from "../images/pexels-chanwalrus-958545.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
            style={{ backgroundImage: `url(${homephoto})` }}
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>odZilla
                </h1>
                <p className="text-2xl mb-8">
                    Explore our delicious menu and enjoy great discounts.
                </p>
                <Link
                    to="/menu"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    View Menu
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

