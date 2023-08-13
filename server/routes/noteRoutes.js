const express = require("express");
const router = express.Router();
const Note = require("../models/noteSchema");
const fetchuser = require("../middleware/fetchuser");

require("../db/conn");

router.post("/addnote",fetchuser, async (req, res) => {
    // console.log(req.userID);
    // console.log(req.body);
    try {
        const { title, content} = req.body;
        if (!title || !content) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        const note = new Note({
            title,
            content,
            user: req.userID,
        });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(500).json({ error: "Failed to add note" });
        console.log(error);
    }
}
);

router.get('/mynotes/:id', async (req, res) => {
    try {
        const notes = await Note.find({ user: req.params.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to get notes" });
        console.log(error);
    }
});

module.exports = router;
