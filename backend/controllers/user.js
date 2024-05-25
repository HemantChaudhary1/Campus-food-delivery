const Model = require("../models/schema");
const Modeldish = require("../models/dishes_schema");
const orderData = require("../models/orderData");
const User = require("../models/userRegistration");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function getRes(req, res) {
  try {
    const phone = req.user;
    console.log("phone in backend", phone);
    const restorentInfo = await Model.find({ ph: phone });
    res.json(restorentInfo);
  } catch (error) {
    res.status(404).json({ message: "restaurant not found" });
  }
}
async function getAllUser(req, res) {
  try {
    const Userinfo = await User.find({});
    console.log("User details", Userinfo);
    res.json(Userinfo);
  } catch (error) {
    res.status(404).json({ message: "restaurant not found" });
  }
}
async function getUser(req, res) {
  try {
    const { phone } = req.params;
    console.log("phone of user", phone);
    const Userinfo = await User.find({ phone });
    console.log("User details", Userinfo);
    res.json(Userinfo);
  } catch (error) {
    res.status(404).json({ message: "restaurant not found" });
  }
}
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
    res.status(200).json("order sent succesfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getAllDishes(req, res) {
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
  getRes,
  getUser,
  getAllUser,
};
