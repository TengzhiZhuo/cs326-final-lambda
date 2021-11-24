'use strict';
import express from 'express';
import * as fs from 'fs';
import { get } from 'http';
import path from 'path';
import { MongoClient } from 'mongodb';
const __dirname = path.resolve();

//Heroku
const url = "https://rocky-tundra-99275.herokuapp.com/";
const mongoDBurl = "mongodb+srv://tzhuo:cs326Lambda@cluster0.2noog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
await client.connect();
const db = client.db("UShare");
const collection1 = db.collection("user");
const collection2 = db.collection("post");
const collection3 = db.collection("comment");
const collection4 = db.collection("profile");

const user = await collection1.find().toArray();
const post = await collection2.find().toArray();
const comment = await collection3.find().toArray();
const profile = await collection4.find().toArray();

let data = {};
data['user'] = {};
data['post'] = {};
data['comment'] = {};
data['profile'] = {};
const JSONfile = './database.json';

//reload function
function reload(filename) {
    if (fs.existsSync(filename)) {
        data = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8' }));
    }
    else {
        data = {};
        data['user'] = {};
        data['post'] = {};
        data['comment'] = {};
    }
};

reload(JSONfile);
let app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
//Static files
app.use(express.static(__dirname + '/src/client'));
app.use(express.static(__dirname + '/src/img'));

//Write Functions Here
//Example:
// app.post('/userData', function(req, res) {
//     let body = "";
//     req.on('data', data => body += data);
//     req.on('end', () => {
           //Some data saving ...
//         res.end();
//     });
// });

//Render pages...
app.get('', (req, res) => {
    res.redirect('/mainPage');
});

app.get('/header', (req, res) => {
    
});

//UserPage
app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + '/src/client/userPage.html')
});

app.get('/userPageData', (req, res) => {
    const key = data['user'][req.query['id']];
    res.send(key);
});

app.post('/userPage', (req, res) => {
    const elements = req.body;
    const key = req.body['id'];
    delete elements['id'];
    for (const element in elements) {
        if (elements[element] !== null) {
            data['user'][key][element] = elements[element];
        }
    }
    const string = JSON.stringify(data);
    fs.writeFileSync(JSONfile, string);
    res.send();
});


//MainPage
app.get('/mainPage', (req, res) => {
    res.sendFile(__dirname + '/src/client/mainPage.html')
});

app.post('/mainPage', (req, res) => {
    const elements = req.body;
    const key = req.body['id'];
    delete elements['id'];
    for (const element in elements) {
        data['post'][key][element] = elements[element];
    }
    const string = JSON.stringify(data);
    fs.writeFileSync(JSONfile, string);
    res.send();
});

//SignUp Page
app.get('/signUp', (req, res) => {
    res.sendFile(__dirname + '/src/client/SignUp.html')
});

app.post('/signUp/save', (req, res) => {
    const elements = req.body;
    const key = req.body['id'];
    delete elements['id'];
    for (const element in elements) {
        data['profile'][key][element] = elements[element];
    }
    const string = JSON.stringify(data);
    fs.writeFileSync(JSONfile, string);
    res.send();
});


//Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/src/client/LogInPage.html'));
});

//Server
app.listen(process.env.PORT || 8080);

await client.close();