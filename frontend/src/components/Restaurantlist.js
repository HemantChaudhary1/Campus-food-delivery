// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8001/api/getAllRes")
//       .then((response) => setRestaurants(response.data))
//       .catch((error) => console.error("Error fetching restaurant data:", error));
//   }, []);

//   const handleRestaurantClick = (phone) => {
//     window.location.href = `/Foodlist/${phone}`;
//   };

//   return (
//     <div className="my-20 bg-red-400">
//       <h1>Restaurant List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Restaurant Name</th>
//             <th>Owner Name</th>
//             <th>Phone No</th>
//           </tr>
//         </thead>
//         <tbody>
//           {restaurants.map((restaurant) => (
//             <tr
//               key={restaurant.id}
//               onClick={() => handleRestaurantClick(restaurant.phone)}
//             >
//               <td>{restaurant.name}</td>
//               <td>{restaurant.owner}</td>
//               <td>{restaurant.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RestaurantList;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8001/api/getAllRes")
//       .then((response) => setRestaurants(response.data))
//       .catch((error) => console.error("Error fetching restaurant data:", error));
//   }, []);

//   const handleRestaurantClick = (phone) => {
//     window.location.href = `/Foodlist/${phone}`;
//   };


// return (
//   <div className="my-20 p-6 rounded-lg shadow-lg">
//     <h1 className="text-3xl font-bold mb-6">Restaurant List</h1>
//     <table className="w-full table-auto">
//       <thead>
//         <tr>
//           <th className="px-4 py-2">Restaurant Name</th>
//           <th className="px-4 py-2">Owner Name</th>
//           <th className="px-4 py-2">Phone No</th>
//         </tr>
//       </thead>
//       <tbody>
//         {restaurants.map((restaurant) => (
//           <tr
//             key={restaurant.id}
//             className="cursor-pointer hover:bg-red-200"
//             onClick={() => handleRestaurantClick(restaurant.phone)}
//           >
//             <td className="border px-4 py-2">{restaurant.name}</td>
//             <td className="border px-4 py-2">{restaurant.owner}</td>
//             <td className="border px-4 py-2">{restaurant.phone}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
// };

// export default RestaurantList;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import res1 from "../images/res1.jpg"

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/getAllRes")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching restaurant data:", error));
  }, []);

  const handleRestaurantClick = (phone) => {
    window.location.href = `/Foodlist/${phone}`;
  };

  return (
    <div className="my-20">
      <h1 className="text-3xl font-bold mb-6">Restaurant's Nearby You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={() => handleRestaurantClick(restaurant.phone)}
          >
            <img
              src={res1}
              // src={restaurant.photoUrl}
              alt={restaurant.name}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
              <p className="text-gray-600">{restaurant.description}</p>
              <Link
                to={`/Foodlist/${restaurant.phone}`}
                className="block mt-4 text-blue-500 hover:text-blue-700"
              >
                View Menu
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
