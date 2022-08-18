var fs = require("fs");
var http = require("http");

var path = require("path");

var express = require("express");
//var morgan = require("morgan");
// var compression = require('compression')
// var history = require("connect-history-api-fallback");

var app = express();
//app.use(morgan("combined"));
// app.use(compression());




app.set("port", process.env.PORT || 8080);

app.use(express.static(__dirname + "/build"))
    .get("/", function (req, res) {
        res.sendFile("index.html", {
            root: __dirname + "/build"
        });
    })
    // https://ui.dev/react-router-cannot-get-url-refresh#express
    .get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })
    


var httpServer = http.createServer(app);

httpServer.listen(app.get("port"), function () {
    console.log("The server is listening on port", app.get("port"));
});
