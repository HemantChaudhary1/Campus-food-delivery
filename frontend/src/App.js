import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/Restaurantlist";
import Foodlist from "./components/Foodlist";
import OrderStatus from "./components/OrderStatus";
import UserOrderStatus from "./components/UserOrderstatus";
import ResOwner from "./components/ResOwner";
import Admin from "./components/Admin";
import { AdminPrivateRoute } from "./routes/Adminroute";
import { OwnerRoute } from "./routes/Ownerroute";
import { UserRoute } from "./routes/Userroute";
import HomePage from "./components/home";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Use Routes to wrap Route components */}
        {/* Route for Home */}
        <Route path="/" element={<HomePage />} />
        {/* Route for Login */}
        <Route path="/Login" element={<Login />} />
        {/* Route for Register, conditionally rendered based on isLoggedIn */}
        <Route path="/Register" element={<Register />} />

        <Route
          path="/Restorent"
          element={
            <UserRoute>
              {" "}
              <RestaurantList />{" "}
            </UserRoute>
          }
        />
        <Route
          path="/Foodlist/:phone"
          element={
            <UserRoute>
              <Foodlist />{" "}
            </UserRoute>
          }
        />
        <Route
          path="/userOrders"
          element={
            <UserRoute>
              <UserOrderStatus />
            </UserRoute>
          }
        />

        {/* Owner */}

        <Route
          path="/Orders"
          element={
            <OwnerRoute>
              <OrderStatus />
            </OwnerRoute>
          }
        />
        <Route
          path="/ResDetails/:phone"
          element={
            <OwnerRoute>
              <ResOwner />{" "}
            </OwnerRoute>
          }
        />

        {/* admin */}
        
          <Route path="/admin" element={<AdminPrivateRoute> <Admin /></AdminPrivateRoute>} />
        
      </Routes>
    </div>
  );
}

export default App;
