const express = require("express");

const http = require("http");

const path = require("path");
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");
const jsonParser = express.json();

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "dBsEgkNf7l",
  database: "dBsEgkNf7l",
  password: "knNJ8RFeGG"
}); /*
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
connection.end(function(err) {
    if (err) {
        return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
});*/

const app = express()
  .use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  })
  .use(express.static(path.join(__dirname, "client/build")))
  .get("/get", (req, res) => {
    const sql = `SELECT * FROM cubes`;

    connection.query(sql, function(err, results) {
      if (err) console.log(err);
      res.json(results);
    });
  })
  .post("/change", jsonParser, (req, res) => {
    const time = Date.now();

    const { id } = req.query;
    const { fromX, toX, fromY, toY } = req.body;

    const sql = `UPDATE cubes SET fromX=?, fromY=?, fromTime=?, toX=?, toY=?, toTime=? WHERE id=?`;

    const diffTime =
      Math.floor(
        Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2))
      ) * 10;

    const data = [fromX, fromY, time, toX, toY, time + diffTime, id];

    connection.query(sql, data, function(err, results) {
      if (err) res.json(err);
      res.json(results);
    });
  });

const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.on("connection", socket => {
  console.log("Client connected");
  socket.on("click", function() {
    io.emit("click");
  });
});

server.listen(PORT, function() {
  console.log(`приложение на порту ${PORT}!`);
});
