const express = require("express");

const app = express();

// app.use((req,res,next)=>{
//     console.log("First Function")
//     next()
// })

// app.use((req,res,next)=>{
//     console.log("Second Function")
//     res.send('<h1>Response Returned!</h1>')
// })

app.use("/users", (req, res, next) => {
  console.log("First Function");
  res.send("<h1>Response Returned for users!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("Second Function");
  res.send("<h1>Response Returned!</h1>");
});

app.listen(3000);
