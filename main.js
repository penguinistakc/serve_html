"use strict"

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const routeMap = {
    "/": "views/index.html"
};

const app = http.createServer();

app.on("request", (req, res) => {
    res.writeHead(httpStatus.StatusCode.OK, {
        "Content-Type": "text/html"
    });
    if (routeMap[req.url]) {
        fs.readFile(routeMap[req.url], (error, data) => {
            res.write(data);
            res.end();
        });
    } else {
        res.end("<h1>Sorry, not found.</h1>");
    }
}).listen(port);

console.log(`The server has started and is listening on port: ${port}`);

