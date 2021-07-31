import React from 'react';
import Grid from './grid'
import './components.css';
import Buttons from './button'


class Landing extends React.Component {
	constructor() {
		super();
		this.speed = 100;
		this.rows = 30;
		this.cols = 50;

		this.state = {
            playing: false,
			generation: 0,
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
		}
	}

	selectBox = (row, col) => {
        console.log(row, col)
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
	}

	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		});
    }
    
    makeSpaceship = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        let i = Math.floor(this.rows/2)
        let j = Math.floor(this.cols/2)
        console.log(i)
        console.log(j)
        gridCopy[i-2][j-1] = true //i == 15, j == 25
        gridCopy[i-3][j-1] = true //28
        gridCopy[i-3][j] = true
        gridCopy[i-2][j] = true
        gridCopy[i-1][j+1] = true
        gridCopy[i-1][j-2] = true
        gridCopy[i-4][j-2] = true
        gridCopy[i-4][j-3] = true
        gridCopy[i-4][j+1] = true
        gridCopy[i-4][j+2] = true
        gridCopy[i-1][j+3] = true
        gridCopy[i][j+3] = true
        gridCopy[i-1][j-4] = true
        gridCopy[i][j-4] = true
        gridCopy[i+2][j+3] = true
        gridCopy[i+2][j-4] = true
        gridCopy[i+3][j-3] = true
        gridCopy[i+3][j-2] = true
        gridCopy[i+4][j-2] = true
        gridCopy[i+4][j-1] = true
        gridCopy[i+4][j] = true
        gridCopy[i+4][j+1] = true
        gridCopy[i+3][j+1] = true
        gridCopy[i+3][j+2] = true
        gridCopy[i+6][j-1] = true
        gridCopy[i+6][j] = true
        gridCopy[i+7][j] = true
        gridCopy[i+7][j-1] = true

		this.setState({
			gridFull: gridCopy
		});
    }

	playButton = () => {
		clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
        this.setState({playing: true})
    }
    
    stepThrough = () => {
        this.speed = 10;
        this.playButton();
        setTimeout(() => {
            clearInterval(this.intervalId);
        }, 10)
    }

	pauseButton = () => {
        clearInterval(this.intervalId);
        this.setState({playing: false})
	}

	slow = () => {
		this.speed = 500;
		this.playButton();
	}

	fast = () => {
		this.speed = 50;
		this.playButton();
	}

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
	}

	gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 30;
				this.rows = 20;
			break;
			case "2":
				this.cols = 50;
				this.rows = 30;
			break;
			default:
				this.cols = 70;
				this.rows = 50;
		}
		this.clear();

	}

	play = () => {
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});

	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="game">
				<h1>Conway's Game of Life</h1>
				<Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
                    gridSize={this.gridSize}
                    stepThrough={this.stepThrough}
                    makeSpaceship={this.makeSpaceship}
				/>
				<h2>Generations: {this.state.generation}</h2>
				<div className="gradient-border" style={{width: (this.cols * 12) + 1}}>
					<Grid
						gridFull={this.state.gridFull}
						rows={this.rows}
						cols={this.cols}
						selectBox={this.selectBox}
						playing={this.state.playing}
					/>
				</div>
				<article className = "rules">
					<h3 className="rules-header">Rules:</h3>
					<ul className="rules-list">
						<li>Any live cell with two or three live neighbours survives.</li>
						<li>Any dead cell with three live neighbours becomes a live cell.</li>
						<li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
					</ul>
					<h3 className="rules-header">Bio:</h3>
					<img className="john" src = "https://d2r55xnwy6nx47.cloudfront.net/uploads/2015/08/Conway_1k.jpg" alt="John Conway's Portrait"></img>
					<p className="bio">
						John Conway was an English mathematician who has produced many results in the theory of finite groups, knot theory, number theory, combinatorial game theory and coding theory. He also made many contributions to recreational mathematics, including the Game of Life.
					</p>
				</article>
			</div>
		);
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

export default Landing