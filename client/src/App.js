import React from 'react';
import './App.css';
import axios from 'axios'

import openSocket from 'socket.io-client';


const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`

const socket = openSocket('http://localhost:9000');

socket.on('click', (msg) => {
    alert('click')
});

export default class App extends React.Component{
    constructor(){
        super()
        this.time = Date.now()
        this.state = {cubes: [], currentCube: 1}
        this.c = null
        this.ctx = null
    }
    getCubes = async () => {

        try {
            const {data} = await axios.get(`${url}/get`)
            this.setState({cubes: data})

        }
        catch (e) {
            console.log(e)
        }

    }
    getCoords = (cube) => {
        const {fromTime, toTime, fromX, toX, fromY, toY} = cube

        const globDiff = toTime - fromTime
        let curDiff = this.time - fromTime

        if(curDiff > globDiff)curDiff = globDiff

        const factor = globDiff / curDiff

        const diffX = toX - fromX
        const diffY = toY - fromY

        const x = fromX + diffX * factor
        const y = fromY + diffY * factor
        return {x, y}

    }

    canvasClick = async (event) => {
        socket.emit('click');

        const {currentCube} = this.state

        const {pageX, pageY} = event

        await axios.post(`${url}/change?id=${currentCube}`, {
            fromX: 0,
            fromY: 0,
            toX: pageX,
            toY: pageY,
        })
    }
    drawLoop = () => {
        const {cubes} = this.state
        this.time = Date.now()

        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        this.ctx.rect(0, 0, this.c.width, this.c.height);
        this.ctx.fill();

        cubes.forEach(cube => {

            const {x, y} = this.getCoords(cube)

            this.ctx.beginPath();
            this.ctx.fillStyle = 'orange'
            this.ctx.rect(x, y, 100, 100);
            this.ctx.fill();
        })

        requestAnimationFrame(this.drawLoop)
    }
    componentDidMount() {
        this.getCubes()
        this.c = document.getElementById('canvas')
        this.ctx = this.c.getContext('2d')

        requestAnimationFrame(this.drawLoop)
/*
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        this.ctx.rect(0, 0, this.c.width, this.c.height);
        this.ctx.fill();
        */
    }

    render(){
        const {cubes} = this.state
        return (
            <div>
                <canvas onClick={this.canvasClick}  width={1500} height={700} id="canvas" />
                {cubes.map(cube => <div key={cube.id}>{cube.name}</div>)}
            </div>
        )
    }
}
