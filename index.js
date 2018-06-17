/// Reference dependancies 
const app = require("express")(); 
const server = require("http").Server(app); 
const io = require("socket.io")(server); 

/// Server our index.html file when the route URL is visited 

app.use((req, res, next) => { // Cross-Origin 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, "); 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'AIzaSyCCui2d446zKcmmcfCUVKnxw_Om,application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === "OPTIONS") { 
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); 
        return res.status(200).json({}); 
    } 
    next(); 
});

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
    socket.on("video-one-selected newSrc", newSrc => { 
        io.emit("video-one-selected newSrc", newSrc); 
        console.log(newSrc); 
    }); 
    socket.on("video-two-selected newSrc", newSrc => { 
        io.emit("video-two-selected newSrc", newSrc); 
        console.log(newSrc); 
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

