// link the api routes to the database, so that, user input can be stored and displayed
const noteData = require("../db/db.json");
const fs = require("fs");


module.exports = function(app) {
//Get requests
    // these show the user what is already in db.json, and updates as push requests are added 

    // Get all of the data from the database
    app.get("/api/notes", function(req, res) {
        // Send a response to the server
        res.json(noteData);
    });

    // Get specific data by id, so that, you can select an individual note to display, and delete a note later
    app.get("/api/notes/:id", function(req, res) {
        // Send a response to the server
        res.json(data[Number(req.params.id)]);
    });

// Post request
    
    // These add the users input 
    app.post("/api/notes", function(req, res) {
        // req.body is the users input, we are calling it newNote, we need to give it a unique id
        const newNote = req.body;
        let noteId = newNote.title + " " + (Math.floor(Math.random() * 10));
        newNote.id = noteId;
    
        // Add the newNote to the database
        noteData.push(newNote);
    
        // Update the database
        fs.writeFile("../db/db.json", JSON.stringify(noteData), function(err) {
        // Send a response to the server
        res.json(newNote);
        });
    
    });

// Delete requests

    // Delete notes by their id
    app.delete("/api/notes/:id", function(req, res) {
        // Select the note by its id 
        const deleteNote = req.params.id;
        // Remove the note from the database
        noteData.pop(deleteNote);
        // Update the database
        fs.writeFile("../db/db.json", JSON.stringify(noteData), function(err) {
        });
        // Send a response to the server
        res.send("DELETE request called");
    });

};

