const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/crud_db");

const Item = mongoose.model("Item", {
  name: String,
  description: String,
  price: Number
});

// Get all
app.get("/items", async (req, res) => {
  res.json(await Item.find());
});

// Get one
app.get("/items/:id", async (req, res) => {
  res.json(await Item.findById(req.params.id));
});

// Create
app.post("/items", async (req, res) => {
  res.json(await Item.create(req.body));
});

// Update
app.put("/items/:id", async (req, res) => {
  res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete
app.delete("/items/:id", async (req, res) => {
  res.json(await Item.findByIdAndDelete(req.params.id));
});

// Start server
app.listen(3000, () => console.log("Server running on 3000"));