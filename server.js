'use strict';

//import { MongoClient } from 'mongodb';
import express from 'express';
import * as fs from 'fs';
import { get } from 'http';
import path from 'path';
import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

const __dirname = path.resolve();

// Heroku
// const url = "https://rocky-tundra-99275.herokuapp.com/";
// const mongoDBurl = "mongodb+srv://tzhuo:cs326Lambda@cluster0.2noog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
// const client = new MongoClient(mongoDBurl);
// await client.connect();
// const db = client.db("UShare");
// const collection1 = db.collection("user");
// const collection2 = db.collection("post");
// const collection3 = db.collection("comment");
// const collection4 = db.collection("profile");

// const user = await collection1.find().toArray();
// const post = await collection2.find().toArray();
// const comment = await collection3.find().toArray();
// const profile = await collection4.find().toArray();

// let data = {};
// data['user'] = {};
// data['post'] = {};
// data['comment'] = {};
// data['profile'] = {};
// const JSONfile = './database.json';

//Heroku
// "https:/  /rocky-tundra-99275.herokuapp.com/";

let database;
if (existsSync("database.json")) {
    database = JSON.parse(readFileSync("database.json"));
} else {
    database = {
        post: [],
        user: [],
        profile: []
    };
}

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/postsubmit') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.post.push({
                title: data.title,
                content: data.content
            });
            
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    } else if (parsed.pathname === '/gameScore') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.gameScores.push({
                name: data.name,
                score: data.score
            });
            
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });

            res.end(JSON.stringify(
                database.post
            ));
        });
    } else if (parsed.pathname === '/getPost') {
        res.end(JSON.stringify(
            database.post
        ));
    } else if (parsed.pathname === '/highestGameScores') {
        res.end(JSON.stringify(
            database.gameScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10)
        ));
    } else {
        // If the client did not request an API endpoint, we assume we need to fetch and serve a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
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
            // TODO you need to check for other filetypes and write the correct MIME type in the header.
            // Without these, the browser is sometime incapable of interpreting the file as it should
            // (Notably for JS files)

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(8080);
//process.env.PORT || 8080
