const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

//database config
mongoose.connect('mongodb://127.0.0.1:27017/todoList')
.then(()=>console.log("Connection Successful"))
.catch(err=>console.log(err))

//modals

const List = require('./modals/list_modal')

app.use(cors());
app.use(express.json());


app.get("/todo",function(req,res){
    List.find({ })
    .then((data)=>res.send(data))
    .catch(err=>res.json(err))
});


app.post("/save",function(req,res){
    if(req.body.text.trim() === ""){
        res.statusCode = 400
        res.send(JSON.stringify("Invalid Input"))
        return
    }

    let newObj = {
        _id:Date.now(),
        item:req.body.text
    }
    const item = new List(newObj)
    item.save()
    .then(()=>{
        res.json("Success")
    })
    .catch(err=>res.json(err))


})

app.all("/todo",function(req,res){
    if(req.method === "PUT"){
        List.updateOne({ _id: req.body.key },{item:req.body.data})
        .then(()=>{
            res.json("success")
        })
        return
    }
    else if(req.method === "DELETE"){
        List.deleteOne({ _id:req.body.key })
        .then(()=>{
            res.json("success")
        })
        return
    }
    res.statusCode = 404
    res.send();
});


app.listen("8000",function(){
    console.log("app listening on port 8000");
})
