const express = require('express');

const http = require('http');

const path = require('path')
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");
const jsonParser = express.json();

//const io = require('socket.io')();

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

const app = express().use(function (req, res, next) {

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
}).use(express.static(path.join(__dirname, 'client/build'))).get('/get', (req,res) => {

    const sql = `SELECT * FROM cubes`;

    connection.query(sql, function(err, results) {
        if(err) console.log(err);
        res.json(results);
    });


}).post('/change', jsonParser, (req,res) => {

    const time = Date.now()

    const {id} = req.query
    const {fromX, toX, fromY, toY} = req.body

    const sql = `UPDATE cubes SET fromX=?, fromY=?, fromTime=?, toX=?, toY=?, toTime=? WHERE id=?`;

    const diffTime = Math.floor(Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)))

    const data = [fromX, fromY, time, toX, toY, time + diffTime, id];

    connection.query(sql, data, function(err, results) {
        if(err) res.json(err);
        res.json(results);
    });


});

const server = http.createServer(app);
const io = require('socket.io').listen(server);


io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('click', function(){
        io.emit('click')
    });
});

/*
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});*/
/*
io.on('connection', function(socket){
    console.log('подключен юзер')
    socket.on('click', function(){
        io.emit('click')
    });
});


io.listen(9000);
*/
server.listen(PORT, function(){
    console.log(`приложение на порту ${PORT}!`)
});