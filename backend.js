// build server structure
    // get required modules
    const express = require("express")
    // configure express
        // set basic properties for server
           
            // create a var that tells node.js that we are building an express server - call the express function
            const app = express();
            
            // set the listening port for the server
            const PORT = process.env.PORT || 8080;
            
            // tell express what to do with what it hears
                // this tells the express function to recognize the incoming request object as strings or arrays, extended true tell it to use the qs module library
            app.use(express.urlencoded({ extended: true }));
                // this tells express to recognize the incoming request object as a JSON object
            app.use(express.json());
        
        // router, tell the server where the information is 
        require("./public/notes.html")(app);
        require("./public/index.html")(app);

        // Listener, start the server
        app.listen(PORT, function() {
            console.log("App listening on PORT: " + PORT);
          });




