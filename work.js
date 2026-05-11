const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());


// CONNECT TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/crud_db")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// ITEM MODEL
const Item = mongoose.model("Item", {
    name: String,
    description: String,
    price: Number
});



// GET ALL ITEMS
app.get("/items", async (req, res) => {

    const items = await Item.find();

    res.status(200).json(items);
});



// GET ONE ITEM
app.get("/items/:id", async (req, res) => {

    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json(item);

    } catch {

        res.status(500).json({
            message: "Error"
        });
    }
});



// CREATE ITEM
app.post("/items", async (req, res) => {

    const { name, description, price } = req.body;

    if (!name || !description || !price) {

        return res.status(400).json({
            message: "All fields required"
        });
    }

    const item = new Item({
        name,
        description,
        price
    });

    await item.save();

    res.status(201).json(item);
});



// UPDATE ITEM
app.put("/items/:id", async (req, res) => {

    try {

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json(item);

    } catch {

        res.status(500).json({
            message: "Error"
        });
    }
});



// DELETE ITEM
app.delete("/items/:id", async (req, res) => {

    try {

        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(204).send();

    } catch {

        res.status(500).json({
            message: "Error"
        });
    }
});



// START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});