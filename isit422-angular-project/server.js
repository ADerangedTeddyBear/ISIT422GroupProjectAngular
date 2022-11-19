const { MongoClient, Db, MongoDBNamespace, BSONType } = require("mongodb");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { ColdObservable } = require("rxjs/internal/testing/ColdObservable");
let client;

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


const idxCollection = ['courses', 'students', 'teachers', 'projects', 'project_lists'];
const colls = [
    { id: 0, name: 'courses' },
    { id: 1, name: 'students' },
    { id: 2, name: 'teachers' },
    { id: 3, name: 'projects' },
    { id: 4, name: 'project_lists' }
];


/*Constructor used to store id values for inserts. Its necessary because in order to insert a value, we have to go into the 
collection and find the maximum existing id so that we can set the next id for the new record to be inserted*/
function PreviousId(value, next) {
    this.value = value || null;
    this.next = next || null;
};
//Current instance for setting new id for a new record
PreviousId.current = new PreviousId();

app.post('/api/createnewproject/:id', (req, res) => {
    var o = req.body;
    var dbo = client.db("db");
    var idValue = req.params.id;
    let searchCollection = colls[idValue].name;
    dbo.collection(searchCollection).find({}).sort({id:-1}).limit(1).toArray(function(err, res2) {
        if(err) throw err;
        let obj = res2[0];
        if((Object.getOwnPropertyNames(obj))[1] === 'id') {
            PreviousId.current.value = obj.id;
            PreviousId.current.next = obj.id += 1;
        }
        o.id = PreviousId.current.next;
        dbo.collection(searchCollection).insertOne(o, function(err, res3) {
            if(err) throw err;
            console.log('inserted, hopefully');    
        })
    })
})

app.post('/api/createnewuser/:id', (req, res) => {
    /*the stringified object passed from database service -- id, name, username, password and user_type*/
    var o = req.body;
    /*the individual stringified object values sent from database service*/
    //console.log(`user_type: ${obj.user_type} | username: ${obj.username}| password: ${obj.password}| name: ${obj.name}`);
    var dbo = client.db("db");
    /*id variable passed at end of url*/
    var idValue = req.params.id;
    //console.log(`idValue: ${idValue}`);
    /*collections object derived from the constant in this document, using the id variable as the index to 
    select the correct collection to get the greatest id value in the collection*/
    let searchCollection = colls[idValue].name;
    //console.log(`searchCollection: ${searchCollection}`);
    dbo.collection(searchCollection).find({}).sort({id:-1}).limit(1).toArray(function(err, res2) {
        if(err) throw err;
        let obj = res2[0];
        //validate that the database records do contain our custom id field
        if((Object.getOwnPropertyNames(obj))[1] === 'id') {
            //console.log(`typeof obj.id: ${typeof obj.id}`);
            //store previous max id within specified collection in PreviousId Object property to retain value
            PreviousId.current.value = obj.id;
            //set the next id to keep ids unique
            PreviousId.current.next = obj.id += 1;
        }
        //update value of id to increment by 1 from the largest id found in the database
        o.id = PreviousId.current.next;
        //remove object property "user_type" as it is no longer needed
        delete o.user_type;
        for(var p in o) {
            console.log(`${p} : ${o[p]}`);
        }
        //insert the new user in the database
        dbo.collection(searchCollection).insertOne(o, function(err, res3) {
            if(err) throw err;
            console.log('inserted, hopefully');    
        })
    })
})


app.get('/api/login/:login', (req, res) => {
    let v = req.params.login.split('|');
    let keys = [];
    let vals = [];
    for(let i = 1;i<v.length;i++) {        
        let current = v[i].split(':');
        keys.push(current[0]);
        vals.push(current[1]);
    }
    var obj = req.body;
    var dbo = client.db("db");
    console.log(obj);
    let nameVal = vals[0];
    let passVal = vals[1];
    dbo.collection("students").find({username:nameVal, password:passVal}).toArray(function(err, res2) {
    let loginResponse = '';
    let loginStatus = 0;
        if (err) throw err;
        try{
            if(`${JSON.stringify(res2[0].name).length}` > 0 ) {
                console.log(`student login`)
                loginStatus += 1;
                loginResponseName = res2[0].name;
                loginResponseUsername = res2[0].username;
                loginResponseId = res2[0].id;
                loginResponse += `${loginResponseName}|${loginResponseUsername}|${String(loginStatus)}|${loginResponseId}`;
                res.send(loginResponse);
            }
        } catch(e) {
            dbo.collection("teachers").find({username:nameVal, password:passVal}).toArray(function(err, res3) {
                if(err) throw err;
                try{
                    if(`${JSON.stringify(res3[0].name).length}` > 0 ) {
                        console.log(`teacher login`)
                        loginStatus += 2;
                        loginResponseName = res3[0].name;    
                        loginResponseUsername = res3[0].username;
                        loginResponseId = res3[0].id;
                        loginResponse += `${loginResponseName}|${loginResponseUsername}|${String(loginStatus)}|${loginResponseId}`;
                        res.send(loginResponse);                    
                    }
                } catch(e) {
                    loginResponse = `|${String(loginStatus)}`
                }
            })
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
