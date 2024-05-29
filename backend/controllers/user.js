const Model = require("../models/schema");
const Modeldish = require("../models/dishes_schema");
const orderData = require("../models/orderData");
const User = require("../models/userRegistration");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const redis = require("redis");
async function getRes(req, res) {
  const client = redis.createClient();
  await client.connect();
  try {
    const { phone } = req.params;
    const restaurent = await client.get(phone);
    if (restaurent) {
      res.json(JSON.parse(restaurent));
    } else {
      // console.log("phone in backend", phone);
      const restorentInfo = await Model.find({ phone });
      await client.setEx(phone, 1800, JSON.stringify(restorentInfo));
      res.json(restorentInfo);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.disconnect();
  }
}

async function getAllUser(req, res) {
  try {
    const Userinfo = await User.find({});
    //console.log("User details", Userinfo);
    res.json(Userinfo);
  } catch (error) {
    res.status(404).json({ message: "restaurant not found" });
  }
}
async function getUser(req, res) {
  const client = redis.createClient();
  await client.connect();
  try {
    const { phone } = req.params;
    //console.log("phone of user", phone);
    const user = await client.get(phone);
    if (user) {
      res.json(JSON.parse(user));
    } else {
      const Userinfo = await User.find({ phone });
      await client.setEx(phone, 1800, JSON.stringify(Userinfo));
      //console.log("User details", Userinfo);
      res.json(Userinfo);
    }
  } catch (error) {
    res.status(404).json({ message: "restaurant not found" });
  } finally {
    await client.disconnect();
  }
}
async function getAllRes(req, res) {
  const client = redis.createClient();
  await client.connect();
  try {
    // const { input } = req.query;
    const key = "ami";
    const data = await client.get(key);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      const data = await Model.find({});
      await client.setEx(key, 1800, JSON.stringify(data));
      res.json(data);
    }
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
  const client = redis.createClient();
  await client.connect();
  try {
    const { phone } = req.params;
    // const { input } = req.query;
    const data = await client.get(phone);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      const data = await Modeldish.find({ ph: phone });
      await client.setEx(phone, 1800, JSON.stringify(data));
      res.json(data);
    }
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
