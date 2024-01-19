const express = require("express");
const router = express.Router();
const userdetails = require("../middleware/userdetails");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//endpoint to get all the note
router.get("/fetchallnotes", userdetails, async (req, res) => {
  
  try{
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }catch(e){
      res.status(400).json(e);
      console.log(e.message)
  }
  
  
});

//endpoint to add a new note
router.post(
  "/addnote",
  userdetails,
  body("title").isLength({ min: 5 }),
  body("description").isLength({ min: 5 }),
  async (req, res) => {
    const { title, description, tag } = req.body;

    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    try{
      const savednote = await note.save();
      res.json(savednote);
    }
    catch(e)
    {
      console.log(e.message);
      res.status(400).json(e);
    }
    
  }
);

//endpoint to update a previous node
router.put("/updatenote/:id", userdetails, async (req, res) => {
  const { title, description, tag } = req.body;

  const newnote = req.body;
  if (title) {
    newnote.title == title;
  }
  if (description) {
    newnote.description == description;
  }
  if (tag) {
    newnote.tag == tag;
  }

  //findin the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() != req.user.id) {
    return res.status(401).send("not allowed");
  }

  try{
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  }catch(e)
  {
    console.log(e.message);
    res.status(400).json(e);
  }
  
});

//endpoint to delete a noe
router.delete("/deletenote/:id", userdetails, async (req, res) => {
  
    
  
    //finding the note
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
  
    try{
      note = await Notes.findByIdAndDelete(
        req.params.id    
      )
      res.json({"success":"deleted successfully",note:note});
    }catch(e)
    {
      console.log(e.message);
      res.send(400).json(e);
    }
    
  });
  


module.exports = router;
