const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
// app.use(express.static(path.join(__dirname,)))



let port = 8080;


http.listen(port,()=>{
    console.log("Listening on port:",port);
});

app.get('/',(req,res)=>{
    res.render("index.ejs");
})


//Socket 
const io = require('socket.io')(http)


io.on('connection',(socket)=>{
    console.log("Connected..");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})