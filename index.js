const express = require("express");

const http = require("http");

const path = require("path");
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "dBsEgkNf7l",
  database: "dBsEgkNf7l",
  password: "knNJ8RFeGG"
});

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
  .use(express.static(path.join(__dirname, "client/build")));

const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.on("connection", async socket => {
  console.log("Client connected");
  io.emit("click", await getCubes());

  socket.on("click", async function({ id, data }) {
    await change(id, data);
    io.emit("click", await getCubes());
  });
});

server.listen(PORT, function() {
  console.log(`приложение на порту ${PORT}!`);
});

async function getCubes() {
  return new Promise((resolutionFunc, rejectionFunc) => {
    connection.query(`SELECT * FROM cubes`, function(err, results) {
      if (err) console.log(err);
      resolutionFunc(results);
    });
  });
}

async function change(id, cubeData) {
  return new Promise((resolutionFunc, rejectionFunc) => {
    const time = Date.now();

    const { fromX, toX, fromY, toY } = cubeData;

    const sql = `UPDATE cubes SET fromX=?, fromY=?, fromTime=?, toX=?, toY=?, toTime=? WHERE id=?`;

    const diffTime =
      Math.floor(
        Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2))
      ) * 10;

    const data = [fromX, fromY, time, toX, toY, time + diffTime, id];

    connection.query(sql, data, function(err, results) {
      if (err) console.log(err);
      resolutionFunc(results);
    });
  });
}
