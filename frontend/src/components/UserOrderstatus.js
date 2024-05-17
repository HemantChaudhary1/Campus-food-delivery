import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../services/authServices";
const UserOrderStatus = () => {
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Use Axios for fetching data
    Orders();
  }, []);
  const Orders = async () => {
    const token = authService.getToken();
    axios
      .get("http://localhost:8001/api/userOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        const initializedFoodlist = response.data.map((item) => ({
          dishName: item.dishName,
          quantity: item.quantity,
          price: item.dishPrice,
          userid: item.ph,
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="mt-20">
      <h1>Order list</h1>
      <table>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Quantity</th>
            <th>Dish Price</th>
          </tr>
        </thead>
        <tbody>
          {foodlist.map((item, index) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>item will be delivered in next 30 minutes.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderStatus;
