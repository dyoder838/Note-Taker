// link the api routes to the database, so that, user input can be stored and displayed

const fs = require("fs");
const path = require("path")
let noteData = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
noteData = JSON.parse(noteData)


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
        let noteId = newNote.title + (Math.floor(Math.random() * 10));
        
        // add the id to the newNote
        newNote.id = noteId;
    
        // Add the newNote to the database
        noteData.push(newNote);
    
        // Update the database
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData), function(err) {
        // Send a response to the server
        res.json(newNote);
        });
    
    });

// Delete requests

    // Delete notes by their id
    app.delete("/api/notes/:id", function(req, res) {
        // Select the note by its id  - this comes from the delete button on the front end
        const deleteNote = req.params.id;
        // Make an empty array to hold changes
        let savedNotes = [];
        // Loop over all saved notes from the database
        for(let i = 0; i < noteData.length; i++){
            // Find the keepers, exclude the note to be deleted - so indirectly deleting the note 
            if (noteData[i].id !== deleteNote){
                savedNotes.push(noteData[i])
            }
        }
        // Update the screen
        noteData = [...savedNotes] 
        // Update the database
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(savedNotes), function(err) {
        });
        // Send a response to the server
        res.send("DELETE request called");
    });

};

