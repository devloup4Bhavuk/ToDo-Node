const express = require('express')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,"../build")))

app.listen("3000",function(){
    console.log("App running on port 3000")
})