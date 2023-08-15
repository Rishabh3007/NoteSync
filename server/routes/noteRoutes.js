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

router.get('/mynotes', fetchuser,  async (req, res) => {
    // console.log(req.userID);
    try {
        const notes = await Note.find({ user: req.userID });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to get notes" });
        console.log(error);
    }
});

router.delete('/deletenote', fetchuser, async (req, res) => {
    // console.log(req.body);
    // console.log(req.userID);
    try {
        const { noteID } = req.body;
        const note = await Note.findById(noteID);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.toString() !== req.userID) {
            return res.status(401).json({ error: "Not allowed" });
        }
        await Note.deleteOne({ _id: noteID });
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete note" });
        console.log(error);
    }
});

module.exports = router;
