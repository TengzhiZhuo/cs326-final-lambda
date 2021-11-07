'use strict';
import express from 'express';
import * as fs from 'fs';
import { get } from 'http';
import path from 'path';
const __dirname = path.resolve();

let data = {};
data['user'] = {};
data['post'] = {};
data['comment'] = {};
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
//UserPage
app.get('', (req, res) => {
    res.sendFile(__dirname + '/src/client/userPage.html');
});

//UserPage needed data
app.get('/userPage', (req, res) => {
    const key = data['user'][req.query['id']];
    res.send(key);
});

app.post('/userPage/save', (req, res) => {
    const elements = req.body;
    const key = req.body['id'];
    delete elements['id'];
    for (const element in elements) {
        data['user'][key][element] = elements[element];
    }
    const string = JSON.stringify(data);
    fs.writeFileSync(JSONfile, string);
    res.send();
});

//Server
app.listen(8080, function() {
    console.log("App avaliable on http://localhost:8080");
});