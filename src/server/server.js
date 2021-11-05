'use strict';
import * as express from 'express';
import { allowedNodeEnvironmentFlags } from 'process';

let data = {};
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
    res.send(data['userPage']['userName']);
});

app.post('/userPage/save', (req, res) => {
    const k = req.body;
    for (const key in k) {
        data['userPage']['userName'][key] = k[key];
    }
    res.send();
});

app.post('/userPage/avatar', (req, res) => {
    const k = req.params['image'];
    data['userPage']['userName']['image'] = k; 
    res.send();
});

//Server
let server = app.listen(8080, function() {
    
});