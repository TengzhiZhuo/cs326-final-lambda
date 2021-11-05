'use strict';
import * as express from 'express';

let data = {};
let app = express();

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

app.get("/user");

//Server
let server = app.listen(8080, function() {
    
});