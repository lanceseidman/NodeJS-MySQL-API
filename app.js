var mysql = require('mysql');
var express = require('express');
var app = express();
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("API is listening and running on http://%s:%s", host, port)
});

var dbHost = "HOSTNAME", dbUser = "USERNAME", dbPass = "PASSWORD", dbDatabase = "DATABASE";

// Request/Endpoints
app.get("/getAllUsers", (req, res) => {
    // Setup SQL DB Connection

    var con = mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPass,
        database: dbDatabase
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log('SQL DB Connected!')
    });

    con.query("SELECT id, username, created_at FROM users", function (err, result) {
        if (err) {
            console.log('SELECT ERROR :: ', err.message);
            return;
        }
        con.end();
        res.json(result)
        console.log(result)
    });
});

app.get("/getUser/:id", (req, res) => {
    // Setup SQL DB Connection

    var con = mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPass,
        database: dbDatabase
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log('SQL DB Connected!')
    });

    con.query("SELECT username, created_at FROM users WHERE id = " +req.params.id, function (err, result) {
        if (err) {
            console.log('SELECT ERROR :: ', err.message);
            return;
        }
        con.end();
        res.json(result)
        console.log(result)
    });
});
