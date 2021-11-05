'use strict';
import * as express from 'express';

let data = {};
const JSONfile = './database.json';

//reload function
function reload(filename) {

};

reload();
let app = express();
app.use(express.json());

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

//UserPage needed data
app.get('/userPage', (req, res) => {
});

app.post('/userPage/save', (req, res) => {
});

app.post('/userPage/avatar', (req, res) => {
});

//Server
app.listen(8080, function() {
    
});