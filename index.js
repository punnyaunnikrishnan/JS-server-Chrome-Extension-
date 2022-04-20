const cors =require("cors")
const express=require("express");
const mongoose=require("mongoose");
const app=express();
require("dotenv").config(); 
app.use(express.json())  // parse requests of content-type - application/json
app.use(express.urlencoded({       // parse requests of content-type - application/x-www-form-urlencoded
    extended: true
}));
app.use(cors())
// const user= require("./router/userRouter")
// user(app)
require("./router/userRouter")(app)            //while importing we have to give some argument bcz we r importing some function
require("./router/imageRouter")(app)
// require("./router/computerRouter")(app)
const PORT=process.env.PORT || 3000    //setup server to listen on port 8080 or 3000
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL)
.then(()=>{
    console.log("database connected")
}).catch((err)=>{console.log(err)})
app.get('/',(req,res)=>{
res.send('Hello World');
});
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)})