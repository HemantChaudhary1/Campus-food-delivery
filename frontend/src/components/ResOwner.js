// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios"; // Import Axios
// import OrderStatus from "./OrderStatus";
// import { authService } from "../services/authServices";
// const ResOwner = () => {
//   const { phone } = useParams();
//   const [foodlist, setFoodlist] = useState([]);
//   const [data, setData] = useState([]);
//   const [dishName, setName] = useState("");
//   const [dishPrice, setPrice] = useState();
//   const [ph, setResid] = useState();
//   useEffect(() => {
//     // Use Axios for fetching data
//     axios
//       .get(`http://localhost:8001/api/getAllDishes/${phone}`)
//       .then((response) => {
//         setData(response.data);
//         const initializedFoodlist = response.data.map((item) => ({
//           ...item,
//           selected: false,
//         }));
//         setFoodlist(initializedFoodlist);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleDishSelection = (index) => {
//     const updatedFoodlist = [...foodlist];
//     updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
//     console.log("update data",updatedFoodlist);
//     setFoodlist(updatedFoodlist);
//   };

//   const handleDeleteDish = async () => {
//     try {
//       // console.log("item-selected");
//       const selectedItems = foodlist.filter((item) => item.selected);
//       console.log("data",selectedItems);
//       const token = authService.getToken();
      
//       // Extract only the IDs of selected dishes for deletion
//       //const dishIDsToDelete = selectedItems.map((item) => item.id);
      
//       const requestData = {
//         ...selectedItems,
//         token,
//       };
//       const deldata = JSON.stringify(requestData);
//       console.log("req",requestData);
//       const response = await axios.post(
//         "http://localhost:8001/api/deletedishes",
//         requestData
//       );
  
//       console.log("Response from backend:", response.data);
      
//       // Update foodlist state to remove deleted dishes
//       // const updatedFoodlist = foodlist.filter(
//       //   (item) => !selectedItems.includes(item.id)
//       // );
//       // setFoodlist(updatedFoodlist);
  
//       // Optionally, you can also reset the selection
//       // setFoodlist((prevFoodlist) =>
//       //   prevFoodlist.map((item) => ({ ...item, selected: false }))
//       // );
//     } catch (error) {
//       console.error("Error deleting dishes:", error);
//     }
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const token = authService.getToken();
//       axios.post(
//         "http://localhost:8001/api/adddish",
//         {
//           dishName,
//           dishPrice,
//           ph,
//           token,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (error) {}
//   };

//   return (
//     <div className="flex justify-center items-center h-screen text-blue-500">
//       <div className="max-w-lg w-full px-4">
//         <h1 className="text-3xl font-bold mb-4">Food List</h1>
//         <table className="w-full mb-4">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Dish Name</th>
//               <th className="border px-4 py-2">Dish Price</th>
//               <th className="border px-4 py-2">Contact Info</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={item.id}>
//                 <td className="border px-4 py-2">{item.dishName}</td>
//                 <td className="border px-4 py-2">{item.dishPrice}</td>
//                 <td className="border px-4 py-2">{item.ph}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
//                       foodlist[index].selected ? "bg-red-500" : ""
//                     }`}
//                     onClick={() => handleDishSelection(index)}
//                   >
//                     {foodlist[index].selected ? "Unselect" : "Select"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleDeleteDish}
//         >
//           Delete Dishes
//         </button>
//         <br />
//         <br />
//         <form onSubmit={handelSubmit}>
//           <input
//             type="text"
//             placeholder="Dish Name"
//             value={dishName}
//             onChange={(e) => setName(e.target.value)}
//             className="border px-4 py-2 mb-2 w-full"
//           />
//           <br />
//           <input
//             type="number"
//             placeholder="Dish Price"
//             value={dishPrice}
//             onChange={(e) => setPrice(e.target.value)}
//             className="border px-4 py-2 mb-2 w-full"
//           />
//           <br />
//           <input
//             type="text"
//             placeholder="Restaurant ID"
//             value={ph}
//             onChange={(e) => setResid(e.target.value)}
//             className="border px-4 py-2 mb-2 w-full"
//           />
//           <br />
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Add Dish
//           </button>
//         </form>
//         {/* <OrderStatus/> */}
//       </div>
//     </div>
//   );
// };

// export default ResOwner;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import OrderStatus from "./OrderStatus";
import { authService } from "../services/authServices";

const ResOwner = () => {
    const { phone } = useParams();
    const [foodlist, setFoodlist] = useState([]);
    const [data, setData] = useState([]);
    const [dishName, setName] = useState("");
    const [dishPrice, setPrice] = useState();
    const [ph, setResid] = useState();
    console.log("Phone number: ", phone);
    console.log("Numbe of phone is ",phone);
    useEffect(() => {
      // Use Axios for fetching data
      axios
        .get(`http://localhost:8001/api/getAllDishes/${phone}`)
        .then((response) => {
          setData(response.data);
          console.log("data",response.data);
          const initializedFoodlist = response.data.map((item) => ({
            ...item,
            selected: false,
          }));
          setFoodlist(initializedFoodlist);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
    const handleDishSelection = (index) => {
      const updatedFoodlist = [...foodlist];
      updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
      console.log("update data",updatedFoodlist);
      setFoodlist(updatedFoodlist);
    };
  
    const handleDeleteDish = async () => {
      try {
        // console.log("item-selected");
        const selectedItems = foodlist.filter((item) => item.selected);
        console.log("data",selectedItems);
        const token = authService.getToken();
        
        // Extract only the IDs of selected dishes for deletion
        //const dishIDsToDelete = selectedItems.map((item) => item.id);
        
        const requestData = {
          ...selectedItems,
          token,
        };
        const deldata = JSON.stringify(requestData);
        console.log("req",requestData);
        const response = await axios.post(
          "http://localhost:8001/api/deletedishes",
          requestData
        );
    
        console.log("Response from backend:", response.data);
        
        // Update foodlist state to remove deleted dishes
        // const updatedFoodlist = foodlist.filter(
        //   (item) => !selectedItems.includes(item.id)
        // );
        // setFoodlist(updatedFoodlist);
    
        // Optionally, you can also reset the selection
        // setFoodlist((prevFoodlist) =>
        //   prevFoodlist.map((item) => ({ ...item, selected: false }))
        // );
      } catch (error) {
        console.error("Error deleting dishes:", error);
      }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const token = authService.getToken();
        axios.post(
          "http://localhost:8001/api/adddish",
          {
            dishName,
            dishPrice,
            ph,
            token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {}
    };
  return (
    <div className="container mx-auto mt-20 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Food List</h1>
      <table className="w-full mb-6 border-collapse bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">Dish Name</th>
            <th className="px-4 py-2 border border-gray-700">Dish Price</th>
            <th className="px-4 py-2 border border-gray-700">Contact Info</th>
            <th className="px-4 py-2 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">
                {item.dishName}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {item.dishPrice}
              </td>
              <td className="border border-gray-700 px-4 py-2">{item.ph}</td>
              <td className="border border-gray-700 px-4 py-2">
                <button
                  className={`${
                    foodlist[index].selected ? "bg-red-500" : "bg-blue-500"
                  } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handleDishSelection(index)}
                >
                  {foodlist[index].selected ? "Unselect" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteDish}
      >
        Delete Dishes
      </button>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="Dish Price"
          value={dishPrice}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-400 p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Restaurant ID"
          value={ph}
          onChange={(e) => setResid(e.target.value)}
          className="border border-gray-400 p-2 w-full bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Dish
        </button>
      </form>
      <OrderStatus/>
    </div>
  );
};

export default ResOwner;
