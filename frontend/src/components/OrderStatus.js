import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../services/authServices";
const OrderStatus = () => {
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Use Axios for fetching data
    Orders();
  }, []);
  const Orders = async () => {
    const token = authService.getToken();
    console.log("token:", token);
    axios
      .get("http://localhost:8001/api/ResOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response from backend",response);
        setData(response.data);
        const initializedFoodlist = response.data.map((item) => ({
          _id: item._id,
          dishName: item.dishName,
          quantity: item.quantity,
          price: item.dishPrice * item.quantity,
          ph: item.ph,
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const handleDishAccept = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].accept = !updatedFoodlist[index].accept;
    setFoodlist(updatedFoodlist);
  };
  const handleOrder = async () => {
    try {
      const token = authService.getToken();
      const data = {
        ...foodlist,
        token,
      };
      const response = await axios.post(
        "http://localhost:8001/api/updateOrder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("order confirmed", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="mt-20">
      <h1>Order list</h1>
      <table>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Dish Price</th>
            <th>Contact Info</th>
            <th>Quantity</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {foodlist.map((item, index) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.price}</td>
              <td>{item.ph}</td>
              <td>
                <button onClick={() => handleDishAccept(index)}>
                  {foodlist[index].accept ? "Reject" : "accept"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <button onClick={() => handleOrder()}>Order confirm</button>
      </table>
    </div>
  );
};

export default OrderStatus;
