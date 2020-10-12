// Link the api routes to the database, so that, user input can be stored and displayed.
    // This is for writing notes to the database. 
const fs = require("fs");
    // This is to support database writing. 
const path = require("path")
    // This references the database - here we are defining where the database is and how to read it. 
let noteData = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
    // The database is JSON, so it needs to be translated - because of this, stringify will need to be used later. 
noteData = JSON.parse(noteData);

// Export the apiRoutes so they can be accessed by ajax
module.exports = function(app) {

//Get requests
    // These show the user what is already in db.json, and updates as push requests are added. 

    // Get all of the data from the database.
    app.get("/api/notes", function(req, res) {
        
        // Send a response to the server.
        res.json(noteData);
    });

    // Get specific data by id, so that, you can select an individual note to display, and delete a note later.
    app.get("/api/notes/:id", function(req, res) {
       
        // Send a response to the server.
        res.json(data[Number(req.params.id)]);
    });

// Post request.
    
    // These add the users input. 
    app.post("/api/notes", function(req, res) {
        // req.body is the users input, we are calling it newNote, we need to give it a unique id.
        const newNote = req.body;
        
        // there are many ways to generate a unique id, this one uses a time stamp as an id.
        let noteId = String(Date.now());
        
        // add the id to the newNote.
        newNote.id = noteId;
    
        // Add the newNote to the database.
        noteData.push(newNote);
    
        // Update the database.
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData), function(err) {
        // Send a response to the server.
        res.json(newNote);
        });
    
    });

// Delete requests.

    // Delete notes by their id.
    app.delete("/api/notes/:id", function(req, res) {
        
        // Select the note by its id  - this comes from the delete button on the front end.
        const deleteNote = req.params.id;

        // Make an empty array to hold changes.
        let savedNotes = [];
        
        // Loop over all saved notes from the database.
        for(let i = 0; i < noteData.length; i++){

            // Find the keepers, exclude the note to be deleted - indirectly deleting the note - there are multiple ways to do this.
            if (noteData[i].id !== deleteNote){
                savedNotes.push(noteData[i])
            }
        }
        
        // Add the notes back to the database.
        noteData = [...savedNotes] 

        // Update the database.
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(savedNotes), function(err) {
        });

        // Send a response to the server.
        res.send("DELETE request called");
    });

};

