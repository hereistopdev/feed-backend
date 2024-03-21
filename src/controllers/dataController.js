const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");
const Data = require("../models/dataModel");

async function createData(req, res) {
  try {
    const { url, feed, history, identifier } = req.body;
    const newData = await Data.create({ url, feed, history, identifier });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getAllDatas(req, res) {
  try {
    const datas = await Data.find({});
    res.status(200).json(datas); // Using .json for consistent JSON response
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function findData(req, res) {
  console.log("Fined Data");
  try {
    const { url } = req.body;
    console.log(url);
    const data = await Data.find({ url }); // Mongoose query
    if (!data) {
      return res.status(404).send({ message: "Data not found" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateData(req, res) {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const db = getDb();
    const updateResult = await db
      .collection("feeds")
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, age } });
    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteData(req, res) {
  try {
    const { id } = req.params;
    const db = getDb();
    const deleteResult = await db
      .collection("feeds")
      .deleteOne({ _id: new ObjectId(id) });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  createData,
  findData,
  updateData,
  deleteData,
  getAllDatas,
};
