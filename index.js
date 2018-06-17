/// Reference dependancies 
const app = require("express")(); 
const server = require("http").Server(app); 
const io = require("socket.io")(server); 

/// Server our index.html file when the route URL is visited 
app.get("/", (req, res) => { 
    res.sendFile(__dirname + "/index.html"); 
}); 

/// Socket.io Code 
// Check for connection 
io.on("connection", socket => { 
    console.log("A user has connected"); 
    // When a chat message is received, send to all clients 
    socket.on("input message", message => { 
        io.emit("input message", message); 
    }); 
    // When a user exits the page [ends the session]
    socket.on("disconnect", () => { 
        console.log("User has disconnected"); 
    }); 
}); 

// Start server on port 4000 
server.listen(4001, () => { 
    console.log("Running"); 
}); 

