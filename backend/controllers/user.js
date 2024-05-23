const Model = require("../models/schema");
const Modeldish = require("../models/dishes_schema");
const orderData = require("../models/orderData");
require("dotenv").config();
const jwt = require("jsonwebtoken");
async function getAllRes(req, res) {
  try {
    // const { input } = req.query;
    const data = await Model.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function sendOrder(req, res) {
  try {
    // Assuming req.body is an array of objects
    res.setHeader("Access-Control-Allow-Origin", "*");
    const verified = jwt.verify(req.body.token, process.env.TOKEN_KEY);
    // console.log("phone sender", verified);
    for (const key in req.body) {
      if (key === "token") {
        continue;
      }
      const item = req.body[key];
      console.log("data:", item);
      if (item.selected === true) {
        const data = new orderData({
          dishName: item.dishName,
          dishPrice: item.dishPrice,
          ph: item.ph,
          phr: verified.ph,
          quantity: item.quantity,
        });
        const savedData = await data.save();
        console.log("saved order", savedData);
      }
    }
    // const dataToSave = await Promise.all(
    //   req.body.map(async (item) => {
    //     console.log(item);
    //     const data = new orderData({
    //       dishName: item.dishName,
    //       dishPrice: item.dishPrice,
    //       ph: item.ph,
    //       quantity: item.quantity,
    //     });

    //     return await data.save();
    //   })
    // );
    // console.log("dataTsave: ");
    res.status(200).json("order sent succesfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getAllDishes(req, res) {
  console.log("HELLO FROM GETALLDISHES");
  try {
    const { phone } = req.params;
    // const { input } = req.query;
    const data = await Modeldish.find({ ph: phone });
    console.log("HERE IS THE DISHES : ", JSON.stringify(data));
    res.json(data);
  } catch (error) {
    console.log("ERROR WHILE SERVING DISHES : ", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllOrder(req, res) {
  try {
    // const { input } = req.query;
    const data = await orderData.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getType(req, res) {
  try {
    // typeofdish - 1 ,2
    const data = await orderData.find();
  } catch (error) {}
}

async function getOrderdetails(req, res) {
  try {
    const phone = req.user;
    console.log("USER", phone);
    const data = await orderData.find({ accept: true, phr: phone });
    console.log("data", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllDishes,
  getAllRes,
  getAllOrder,
  getOrderdetails,
  sendOrder,
};
