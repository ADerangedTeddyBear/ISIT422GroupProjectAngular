const { MongoClient, Db, MongoDBNamespace } = require("mongodb");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
let client;

//@ts-check


/*function CourseId(id,name,isUnique) {
    this.id = id;
    this.name = name;
    this.isUnique = isUnique || true;
}

app.get('api/assignCourseId') {

} */


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:9}))

app.use(cors({
    origin: '*'
}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/api/updateMany', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("ISIT422-db");
    dbo.collection("courses").insertOne(obj, function(err, res2) {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(err));
        } else {
            res.send("inserted")
        }
    })
})

app.post('/api/findAndModify', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("ISIT422-db");
    dbo.collection("courses").insertOne(obj, function(err, res2) {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(err));
        } else {
            res.send("inserted")
        }
    })
})


app.post('/api/insert', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("TestDB");
    dbo.collection("testC").insertOne(obj, function(err, res2) {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(err));
        } else {
            res.send("inserted")
        }
    })
})

app.get('/api/courses', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("ISIT422-db");
    dbo.collection("courses").find({}).toArray(function(err, res2) {
        if (err) throw err;
        console.log(res2);
        res.send(res2);
    })
})

app.get('/api/display', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("TestDB");
    dbo.collection("testcoll2").find({}).toArray(function(err, res2) {
        if (err) throw err;
        console.log(res2);
        res.send(res2);
    })
})


app.get('/api/collections', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("ISIT422-db");
    dbo.listCollections().toArray(function(err, res2) {
        if (err) throw err;
        console.log(res2);
        res.send(res2);
    })
})

app.get('api/display1/:id', (req, res) => {
    dbo.collection("testC").findOne({}, function(err, res2) {
        if (err) throw err;
        console.log(res2);
        res.send(res2);

    })
})

function makeConnection() {
    const uri = "mongodb+srv://eric:thirteen@isit422-groupproject-20.sdxooup.mongodb.net/testDB";
    client = new MongoClient(uri);
    client.connect().then((con) => {
        console.log("mongodb connected");
        
    })
}

var server = app.listen(5000, function() {
    console.log("listening on port ", server.address().port);
    makeConnection();
})