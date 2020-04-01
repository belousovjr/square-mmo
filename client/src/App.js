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
    componentDidMount() {
        this.getCubes()
    }

    render(){
        const {cubes} = this.state
        return (
            <div>
                {cubes.map(cube => <div key={cube.id}>{cube.name}</div>)}
            </div>
        )
    }
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MMO!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/