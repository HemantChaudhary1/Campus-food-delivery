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
//     setFoodlist(updatedFoodlist);
//   };

//   const handleDeleteDish = async () => {
//     try {
//       const selectedItems = foodlist.filter((item) => item.selected);
//       const token = authService.getToken();
//       const data = {
//         ...selectedItems,
//         token,
//       };
//       // Stringify the data and set the Content-Type header
//       // const requestData = JSON.stringify(foodlist);
//       console.log("Data from backend :", data);
//       // Use Axios for the POST request with proper headers
//       const response = await axios.post(
//         "http://localhost:8001/api/deletedishes",
//         data
//       );

//       console.log("response :", response);
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };
//   const handelSubmit = async (event) => {
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
//     <div className="mt-20">
//       <h1>Food list</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Dish Name</th>
//             <th>Dish Price</th>
//             <th>Contact Info</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.id}>
//               <td>{item.dishName}</td>
//               <td>{item.dishPrice}</td>
//               <td>{item.ph}</td>
//               <td>
//                 <button onClick={() => handleDishSelection(index)}>
//                   {foodlist[index].selected ? "Unselect" : "Select"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleDeleteDish}>Delete Dishes</button>
//       <br></br>
//       <br></br>
//       <form onSubmit={handelSubmit}>
//         <input
//           type="name"
//           placeholder="Dish Name"
//           value={dishName}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="number"
//           placeholder="Dish Price"
//           value={dishPrice}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="Restaurent id"
//           placeholder="resid"
//           value={ph}
//           onChange={(e) => setResid(e.target.value)}
//         />
//         <br></br>
//         <button type="submit">add dish</button>
//       </form>
//       {/* <OrderStatus/> */}
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
  useEffect(() => {
    // Use Axios for fetching data
    axios
      .get(`http://localhost:8001/api/getAllDishes/${phone}`)
      .then((response) => {
        setData(response.data);
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
  const handelSubmit = async (event) => {
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
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full px-4">
        <h1 className="text-3xl font-bold mb-4">Food List</h1>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Dish Name</th>
              <th className="border px-4 py-2">Dish Price</th>
              <th className="border px-4 py-2">Contact Info</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.dishName}</td>
                <td className="border px-4 py-2">{item.dishPrice}</td>
                <td className="border px-4 py-2">{item.ph}</td>
                <td className="border px-4 py-2">
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      foodlist[index].selected ? "bg-red-500" : ""
                    }`}
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
        <br />
        <br />
        <form onSubmit={handelSubmit}>
          <input
            type="text"
            placeholder="Dish Name"
            value={dishName}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 mb-2 w-full"
          />
          <br />
          <input
            type="number"
            placeholder="Dish Price"
            value={dishPrice}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-4 py-2 mb-2 w-full"
          />
          <br />
          <input
            type="text"
            placeholder="Restaurant ID"
            value={ph}
            onChange={(e) => setResid(e.target.value)}
            className="border px-4 py-2 mb-2 w-full"
          />
          <br />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Dish
          </button>
        </form>
        {/* <OrderStatus/> */}
      </div>
    </div>
  );
};

export default ResOwner;