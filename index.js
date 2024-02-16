const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let port = 8080;

http.listen(port,()=>{
    console.log("Listening on port:",port);
});

app.get('/main',(req,res)=>{
    res.render("index.ejs");
});

app.get('/',(req,res)=>{
    res.render("main.ejs");
});

//from next line Store user authentication would be done saving the user in database!
//Signup Page
app.post("/user/signup/Auth",(req,res)=>{
    let {username, email, password} = req.body;
    console.log(username, email, password);
    res.redirect("/main");
});
app.get("/user/signup",(req,res)=>{
    res.render("./Auth/signup.ejs");
});


//Write the logic for authentication and find in database and conntinue
//Login Page
app.post("/user/login/Auth",(req,res)=>{
    let {email, password} = req.body;
    console.log(email, password);
    res.redirect("/main");
});
app.get("/user/login",(req,res)=>{
    res.render("./Auth/login.ejs");
});


//Socket 
const io = require('socket.io')(http)


io.on('connection',(socket)=>{
    console.log("Connected..");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})