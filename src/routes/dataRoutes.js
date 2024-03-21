const express = require("express");
const {
  createData,
  findData,
  getAllDatas,
  updateData,
  deleteData,
} = require("../controllers/dataController");

const router = express.Router();

// Route to create a new user
router.post("/", createData);

// Route to get a single Data by ID
router.post("/byURL/", findData);

// Route to get all Datas
router.get("/", getAllDatas);

// Route to update a Data's information by ID
router.put("/:id", updateData);

// Route to delete a Data by ID
router.delete("/:id", deleteData);

// Define more routes for GET, PUT, DELETE

module.exports = router;
