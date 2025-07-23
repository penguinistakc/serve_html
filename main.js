"use strict"

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const getViewURL = (url) => {
    // url = "/about", viewURL = "views/about.html"
    //url = "/index", viewURL = "views/index.html"
    if (url === "/") {
        url = "/index";
    }
    console.log(`File Location: views${url}.html`)
    return `views${url}.html`;
}

const app = http.createServer();

app.on("request", (req, res) => {
    let viewUrl = getViewURL(req.url);
    fs.readFile(viewUrl, (error, data) => {
        if (error) {
            res.writeHead(httpStatus.StatusCodes.NOT_FOUND);
            res.write("<h1>FILE NOT FOUND</h1>");
        } else {
            res.writeHead(httpStatus.StatusCodes.OK, {
                "Content-Type": "text/html"
            });
            res.write(data);
        }
        res.end()
    });
}).listen(port);

console.log(`The server has started and is listening on port: ${port}`);

