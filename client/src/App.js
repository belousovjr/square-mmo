import React from "react";
import "./App.css";
import axios from "axios";

import openSocket from "socket.io-client";

const hostname = window.location.hostname;

const PORT = hostname === "localhost" ? 3000 : "";

const protocol = window.location.protocol;

const url = `${protocol}//${hostname}:${PORT}`;

const socket = openSocket.connect(url); //openSocket(`http://${hostname}:9000`);*/

export default class App extends React.Component {
  constructor() {
    super();
    this.time = Date.now();
    this.state = { cubes: [], currentCube: 1 };
    this.c = null;
    this.ctx = null;
    this.colors = ["red", "orange", "green"];
    this.loading = true;
  }
  getCubes = async () => {
    try {
      this.loading = true;
      const { data } = await axios.get(`${url}/get`);
      this.setState({ cubes: data });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  };
  getCoords = cube => {
    const { fromTime, toTime, fromX, toX, fromY, toY } = cube;

    const globDiff = toTime - fromTime;
    let curDiff = this.time - fromTime;

    if (curDiff < globDiff) {
      const factor = globDiff / curDiff;

      const diffX = toX - fromX;
      const diffY = toY - fromY;

      const x = fromX + diffX / factor;
      const y = fromY + diffY / factor;
      return { x, y };
    } else return { x: toX, y: toY };
  };

  canvasClick = async event => {
      this.loading = true;

    const { currentCube, cubes } = this.state;

    const { pageX, pageY } = event;

    const cube = cubes.find(c => c.id === currentCube);

    if (cube) {
      const { x, y } = this.getCoords(cube);

      await axios.post(`${url}/change?id=${currentCube}`, {
        fromX: x,
        fromY: y,
        toX: pageX - 50,
        toY: pageY - 50
      });
    }
    socket.emit("click");
  };
  drawLoop = () => {
    if (!this.loading) {
      const { cubes, currentCube } = this.state;
      this.time = Date.now();

      this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.rect(0, 0, this.c.width, this.c.height);
      this.ctx.fill();

      cubes.forEach(cube => {
        const { x, y } = this.getCoords(cube);

        this.ctx.beginPath();
        this.ctx.fillStyle = this.colors[cube.id];
        this.ctx.rect(x, y, 100, 100);
        this.ctx.fill();

        if (cube.id == currentCube) {
          this.ctx.beginPath();
          this.ctx.lineWidth = 7;
          this.ctx.strokeStyle = "red";
          this.ctx.rect(x, y, 100, 100);
          this.ctx.stroke();
        }

        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(cube.name, x, y + 45);
        this.ctx.fill();
      });
    }
    requestAnimationFrame(this.drawLoop);
  };
  componentDidMount() {
    this.getCubes();
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");

    socket.on("click", msg => {
      console.log("CLICK");
      this.getCubes();
    });

    requestAnimationFrame(this.drawLoop);
  }

  render() {
    const { cubes, currentCube } = this.state;
    return (
      <div>
        <canvas
          onClick={this.canvasClick}
          width={1500}
          height={700}
          id="canvas"
        />
        <br />
        {cubes.map(cube => {
          const selectClass = cube.id === currentCube ? "select" : "";
          return (
            <div
              style={{ backgroundColor: this.colors[cube.id] }}
              onClick={() => {
                this.setState({ currentCube: cube.id });
              }}
              className={`type ${selectClass}`}
              key={cube.id}
            >
              {cube.name}
            </div>
          );
        })}
      </div>
    );
  }
}
