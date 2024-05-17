import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo.png"
import homephoto from "../images/homepage5.jpg"



const HomePage = () => {
    return (
      <div>
        <div className="h-20">
      <div className="">
        <div className="flex">
          <div className="flex-1">
            <div className="my-8 mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mt-40 mr-60 ">
                Welcome to   <span style={{ color: "rgb(246, 133, 59)" }}>Fo</span>odZilla
                </h2>
              <p className=" mr-40  text-4xl">Explore our delicious menu and enjoy great discounts.</p>
              {/* Other text content */}
              <div>
                <p>Hemant </p>
              </div>
              <div>
                <p>Hemant </p>
              </div>
  
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <img src={homephoto} alt="Home Pagelogo" className="w-full max-w-xs md:max-w-sm lg:max-w-lg rounded-lg shadow-lg mb-4 mt-40" />
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;
  
