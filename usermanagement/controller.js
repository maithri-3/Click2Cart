const { model } = require("mongoose");
const User = require("./models.js");
const { MongoClient, ObjectId } = require("mongodb");

const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`
// const uri = `mongodb+srv://mmuralikrishnacse21_db_user:M%40ithri%4012@cluster0.hf6hczw.mongodb.net/`;
const client = new MongoClient(uri, {});

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const db = client.db("CC_project");
    const collection = db.collection("users");

    const user = new User({ username, email, password });
    const existingUser = await collection.findOne({ username: user.username });

    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Username already taken. Please choose another." });
    }

    const result = await collection.insertOne(user);
    res
      .status(201)
      .send({ message: "User created successfully", userId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
};

const login = async (req, res) => {
  try {
    const { uname, pword } = req.body;
    const db = client.db("CC_project");
    const collection = db.collection("users");

    const realUser = await collection.findOne({ username: uname });
    if (realUser) {
      if (realUser.username === uname && realUser.password === pword) {
        return res.status(200).send({ message: "Login Successful" });
      } else {
        return res.status(401).send({ message: "Incorrect password" });
      }
    } else {
      return res
        .status(404)
        .send({ message: "User not found, please register" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).send({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging out");
  }
};

const get_user = async (req, res) => {
  try {
    const { username } = req.body;
    const db = client.db("CC_project");
    const collection = db.collection("users");
    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching user" });
  }
};



module.exports = { register, login, logout, get_user };

