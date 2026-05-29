const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const noteModel = require("./models/notes.model");

app.use(cors());
app.use(express.json());



// CREATE NOTE
app.post("/post", async (req, res) => {

    try {

        const { title, discription } = req.body;

        const note = await noteModel.create({
            title,
            discription
        });

        res.status(201).json({
            message: "Note created Successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

});


// GET NOTES
app.get("/post", async (req, res) => {

    try {

        const notes = await noteModel.find();

        res.status(200).json({
            message: "Notes fetched successfully",
            notes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE NOTE
app.delete("/post/:id", async (req, res) => {

    try {

        await noteModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE NOTE
app.put("/post/:id", async (req, res) => {

    try {

        const { title, discription } = req.body;

        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.id,
            {
                title,
                discription
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            updatedNote
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
module.exports = app;