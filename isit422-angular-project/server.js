const { MongoClient, Db, MongoDBNamespace, BSONType } = require("mongodb");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
let client;



const colls = [
    { id: 0, name: 'courses' },
    { id: 1, name: 'students' },
    { id: 2, name: 'teachers' },
    { id: 3, name: 'projects' },
    { id: 4, name: 'project_lists' }
];

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


app.get('/api/display', (req, res) => {
    var obj = req.body;
    //console.log(obj);
    var dbo = client.db("db");
    dbo.collection("students").find({}).toArray(function(err, res2) {
        if (err) throw err;
        //console.log(res2);
        res.send(res2);
    })
})

app.get('/api/display/:id', (req, res) => {
    var obj = req.body;
    console.log(obj);
    var dbo = client.db("db");
    dbo.collection(colls[req.params.id].name).find({}).toArray(function(err, res2) {
        if (err) throw err;
        //console.log(res2);
        res.send(res2);
    })
})


app.get('/api/findAndModify/', (req, res) => {
    var obj = req.body;    
    //console.log(`${obj}`);
    var dbo = client.db("db");
    dbo.collection("students").find({}).toArray(function(err, res2) {
        if (err) throw err;
        //console.log(res2);
        res.send(res2);
    })
})

app.get('/api/findAndModify/:id', (req, res) => {
    var obj = req.body;    
    //console.log(`${req.params.id} --- ${obj}`);
    var dbo = client.db("db");    
    dbo.collection(colls[req.params.id].name).find({}).toArray(function(err, res2) {
        if (err) throw err;
        //console.log(res2);
        res.send(res2);
    })
})

app.get('/api/findAndModify/:id/:test', (req, res) => {
    var obj = req.body;
    //console.log(typeof req.params.test)
    let v = req.params.test.split('|');
    let keys = [];
    let vals = [];    
    for(let p in v) {
        let current = v[p].split(':');
        keys.push(current[0]);
        vals.push(current[1]);
    }
    console.log(`keys[0]: ${keys[0]}, vals[0]: ${vals[0]}`);
    console.log(`keys[1]: ${keys[1]}, vals[1]: ${vals[1]}`);
    console.log(`keys[2]: ${keys[2]}, vals[2]: ${vals[2]}`);
    console.log(`keys[3]: ${keys[3]}, vals[3]: ${vals[3]}`);
    console.log(`keys[4]: ${keys[4]}, vals[4]: ${vals[4]}`);
    console.log(`keys[5]: ${keys[5]}, vals[5]: ${vals[5]}`);
    console.log(`keys[6]: ${keys[6]}, vals[6]: ${vals[6]}`);
    var d = new Object;
    d.current = {};
    for(var i=2;i<keys.length;i++) {
        if(String(keys[i]).substr(-2) !== 'ds') {       
            d.current[[`${keys[i]}`]] = vals[i];
        }
    }    
    var dbo = client.db("db");    
    dbo.collection(colls[req.params.id].name).find({id:Number(vals[2])}).toArray(function(err, res2) {        
        if (err) throw err;
        let collection = dbo.collection(colls[req.params.id].name);
        let filter = {id:Number(vals[2])};
        let updateDocument = {
            $set: {id:Number(vals[2]), name:vals[3], username:vals[4], password:vals[5]},
        };
        let options = { upsert: true };
        collection.updateMany(filter, updateDocument, options, function(err, res3) {
            if(err) throw err;
            console.log('1 document updated');            
        })
    });
});

app.get('/api/delete/:id/:test', (req, res) => {
    var obj = req.body;
    //console.log(typeof req.params.test)
    let v = req.params.test.split('|');
    let keys = [];
    let vals = [];    
    for(let p in v) {
        let current = v[p].split(':');
        keys.push(current[0]);
        vals.push(current[1]);
    }
    console.log(`keys[0]: ${keys[0]}, vals[0]: ${vals[0]}`);
    console.log(`keys[1]: ${keys[1]}, vals[1]: ${vals[1]}`);
    console.log(`keys[2]: ${keys[2]}, vals[2]: ${vals[2]}`);
    console.log(`keys[3]: ${keys[3]}, vals[3]: ${vals[3]}`);
    console.log(`keys[4]: ${keys[4]}, vals[4]: ${vals[4]}`);
    console.log(`keys[5]: ${keys[5]}, vals[5]: ${vals[5]}`);
    console.log(`keys[6]: ${keys[6]}, vals[6]: ${vals[6]}`);
    var d = new Object;
    d.current = {};
    for(var i=2;i<keys.length;i++) {
        if(String(keys[i]).substr(-2) !== 'ds') {       
            d.current[[`${keys[i]}`]] = vals[i];
        }
    }    
    var dbo = client.db("db");    
    dbo.collection(colls[req.params.id].name).find({id:Number(vals[2])}).toArray(function(err, res2) {
        if (err) throw err;
        let collection = dbo.collection(colls[req.params.id].name);
        let filter = {id:Number(vals[1])};
        collection.deleteOne(filter, function(err, res3) {
            if(err) throw err;
            //console.log('1 document deleted');
        })
    });
});



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
