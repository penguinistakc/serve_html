"use strict"

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const router = require("./router")

const plainTextContentType = {
    "Content-Type": "text/plain"
};
const htmlContentType = {
    "Content-Type": "text/html"
};

const customReadFile = (file_path, content_type, res) => {
    if (fs.existsSync(file_path)) {
        fs.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            } else {
                res.writeHead(httpStatus.StatusCodes.OK, {
                    "Content-Type": content_type
                });
            }
            res.write(data);
            res.end();
        })
    } else {
        sendErrorResponse(res);
    }
};

router.get("/", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, plainTextContentType);
    res.end("INDEX");
});

router.get("/index.html", (req, res) => {
    customReadFile("views/index.html", htmlContentType, res);
});

router.get("/about.html", (req, res) => {
    customReadFile("views/about.html", htmlContentType, res);
});

router.get("/contact.html", (req, res) => {
    customReadFile("views/contact.html", htmlContentType, res);
})

router.post("/", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, plainTextContentType);
    res.end("POSTED")
})


const sendErrorResponse = res => {
    res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File not Found!</h1>");
    res.end();
};

http.createServer(router.handle).listen(port);

console.log(`The server has started and is listening on port: ${port}`);

