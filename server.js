'use strict';
import express from 'express';
import * as fs from 'fs';
// import path from 'path';
// const __dirname = path.resolve();

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
// //Static files Currently not successful...
// app.use(express.static(__dirname + '/src/'));
// app.use('/client', express.static(__dirname + 'client'));
// app.use('/img', express.static(__dirname + 'img'));

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

// //Render pages... Currently not successful...
// app.get('', (req, res) => {
//     res.sendFile(__dirname + '/src/client/mainPage.html');
// });

//UserPage needed data
app.get('/userPage', (req, res) => {
    const key = data['user'][req.query['id']];
    res.send(key);
});

app.post('/userPage/save', (req, res) => {
    const value = req.body['value'];
    const key = req.body['key'];
    for (const v in value) {
        if (!(key in data['user'])) {
            data['user'][key] = {};
        }
        if (!(v in data['user'][key]))
            data['user'][key][v] = {};
        data['user'][key][v] = value[v];
    }
    const string = JSON.stringify(data);
    console.log(string);
    fs.writeFileSync(JSONfile, string);
    res.send(data);
});

//Server
app.listen(8080, function() {
    console.log("App avaliable on http://localhost:8080");
});