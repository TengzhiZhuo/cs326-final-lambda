'use strict';

import { MongoClient } from 'mongodb';
import path from 'path';
import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

const __dirname = path.resolve();

//Heroku
const url = "https://still-eyrie-05011.herokuapp.com/";

//MongoDB SetUp
const mongoDBurl = "mongodb+srv://tzhuo:cs326Lambda@cluster0.2noog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(mongoDBurl);
try {
    await client.connect();
    console.log("Connected correctly to server");
} catch (err) {
    console.log(err.stack);
}

const db = client.db("UShare");
const collection1 = db.collection("user");
const collection2 = db.collection("post");
const collection3 = db.collection("comment");
const collection4 = db.collection("profile");

const user = await collection1.find().toArray();
const post = await collection2.find().toArray();
const comment = await collection3.find().toArray();
const profile = await collection4.find().toArray();
//
let database = {};
database['user'] = user;
database['post'] = post;
database['comment'] = comment;
database['profile'] = profile;

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/postsubmit') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            const output = {
                username: data.username,
                title: data.title,
                content: data.content
            };
            database.post.push(output);
            client.connect(err => {
                collection2.insertOne(output);
            });
        });
    } else if (parsed.pathname === '/commentsubmit') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            const output = {
                username: data.username,
                post: data.post,
                content: data.content
            };
            database.comment.push(output);
            client.connect(err => {
                collection3.insertOne(output);
            });
        
        });
    } else if (parsed.pathname === '/signupsubmit') {
        let body = '';
        let result = false;
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            const output = {
                username: data.username,
                password: data.password
            };
            const output2 = {
                username: data.username,
                graduation: "",
                interest: "",
                major: "",
                minor: ""
            }
            for (let element of database.user) {
                if (output.username === element.username) {
                    result = true;
                    break
                }
            }
            if (!result) {
                database.user.push(output);
                client.connect(err => {
                    collection1.insertOne(output);
                    collection4.insertOne(output2);
                });
            
            }
            res.end(JSON.stringify(result));
        });
    } else if (parsed.pathname === '/profilesubmit') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            let num = 0;
            for(var i = 0; i < database.profile.length; i++) {
                if ((database.profile)[i].username === data.username) {
                    num = i;
                    break;
                }
            }
            (database.profile)[num].graduation = data.graduation;
            (database.profile)[num].interest = data.interest;
            (database.profile)[num].major = data.major;
            (database.profile)[num].minor = data.minor;
            client.connect(err => {
                collection4.updateOne(
                    { 
                        username: data.username 
                    },
                    {$set:
                        {
                            graduation: data.graduation,
                            interest: data.interest,
                            major: data.major,
                            minor: data.minor
                        }
                    }
                );  
            });
         
        });
    } else if (parsed.pathname === '/getProfile') {
        res.end(JSON.stringify(
            database.profile
        ));       
    } else if (parsed.pathname === '/getPost') {
        res.end(JSON.stringify(
            database.post
        ));       
    } else if (parsed.pathname === '/getComment') {
        res.end(JSON.stringify(
            database.comment
        ));
    } else if (parsed.pathname === '/loginsubmit') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            let secrets;
            let password;
            if (!process.env.PASSWORD) {
                secrets = require('secrets.json');
                password = secrets.password;
            } else {
                password = process.env.PASSWORD;
            }
            let username;
            if (!process.env.USERNAME) {
                secrets = require('secrets.json');
                username = secrets.username;
            } else {
                username = process.env.USERNAME;
            }

            var found = false;
            for(var i = 0; i < database.user.length; i++) {
                if ((database.user)[i].username === data.username && (database.user)[i].password === data.password) {
                    found = true;
                    break;
                }
            }
            if (data.password === password && data.username === username) {
                found = true;
            }
            if (found) {
                res.end(JSON.stringify(
                    true
                ));    
            }   else {
                res.end(JSON.stringify(
                    false
                ));
            }
        });
    //     let body = '';
    //     req.on('data', data => body += data);
    //     req.on('end', () => {
    //         const data = JSON.parse(body);
    //         var found = false;
    //         for(var i = 0; i < database.user.length; i++) {
    //             if ((database.user)[i].username === data.username && (database.user)[i].password === data.password) {
    //                 found = true;
    //                 break;
    //             }
    //         }
    //         if (found) {
    //             res.end(JSON.stringify(
    //                 true
    //             ));    
    //         }   else {
    //             res.end(JSON.stringify(
    //                 false
    //             ));
    //         }
    //     });
    // } else {
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            }
            if (filename.endsWith("js")) {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
            }
            if (filename.endsWith("css")) {
                res.writeHead(200, {"Content-Type" : "text/css"});
            }
            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(process.env.PORT || 8080);
//process.env.PORT || 8080
