import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`

export default class App extends React.Component{
    constructor(){
        super()
        this.state = {cubes: []}
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
    drawLoop = () => {
        const {cubes} = this.state

        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        this.ctx.rect(0, 0, this.c.width, this.c.height);
        this.ctx.fill();

        cubes.forEach(cube => {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'orange'
            this.ctx.rect(cube.toX, cube.toY, 100, 100);
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
                <canvas  width={1500} height={700} id="canvas" />
                {cubes.map(cube => <div key={cube.id}>{cube.name}</div>)}
            </div>
        )
    }
}
