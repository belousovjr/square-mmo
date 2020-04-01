const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "dBsEgkNf7l",
    database: "dBsEgkNf7l",
    password: "knNJ8RFeGG"
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next()
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/get', (req,res) => {

    const sql = `SELECT * FROM cubes`;

    connection.query(sql, function(err, results) {
        if(err) console.log(err);
        res.json(results);
    });


});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/*
app.get('/', (req,res) =>{
    res.send('<h1>Hello!!!!</h1>');
});*/


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}!`)
});