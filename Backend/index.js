const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
// custom middleware
app.use(function(req,res,next){
    fs.readFile("../data/todo.txt",function(err,data){
        if(err){
            res.statusCode = 500;
            console.log(err)
            res.send("some problem in server");
            return
        }
        if(Object.keys(data).length === 0){
            data = JSON.stringify({})
        }
        req.body.fileData = data
        // console.log(JSON.parse(data))
        next()
    })
})



app.get('/',function(req,res){
    res.send(JSON.stringify("Secure Connection to server"))
})

app.get("/todo",function(req,res){
    res.send(req.body.fileData)
});


app.post("/save",function(req,res){
    if(req.body.text.item.trim() === ""){
        res.statusCode = 400
        res.send(JSON.stringify("Invalid Input"))
        return
    }
    let filedata = JSON.parse(req.body.fileData)
    filedata[req.body.text.index] = req.body.text
    fs.writeFile("../data/todo.txt",JSON.stringify(filedata),function(err){
        if(!err)
        res.send(JSON.stringify("success"))
    })
})

app.all("/todo",function(req,res){
    let filedata = JSON.parse(req.body.fileData)
    if(req.method === "PUT"){
        filedata[req.body.key].item = req.body.data
        fs.writeFile("../data/todo.txt",JSON.stringify(filedata),function(err){
            if(!err)
            res.json("updated")
        })
        return
    }
    else if(req.method === "DELETE"){
        filedata[req.body.key] = undefined
        fs.writeFile("../data/todo.txt",JSON.stringify(filedata),function(err){
            if(!err)
            res.json("deleted")
        })
        return
    }
});

// app.delete("/todo",function(req,res){
//     let filedata = JSON.parse(req.body.fileData)
//     res.json("deleted")
// });

app.listen("8000",function(){
    console.log("app listening on port 8000");
})
