import React from 'react';
import './components.css';
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';


class Buttons extends React.Component {

	handleSelect = (evt) => {
		this.props.gridSize(evt);
	}

	render() {
		return (
			<div className="center">
				<ButtonToolbar className="buttontoolbar">
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-default" onClick={this.props.slow}>
					  Slow
					</button>
					<button className="btn btn-default" onClick={this.props.fast}>
					  Fast
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
					  Randomize
					</button>
                    <button className="btn btn-default" onClick={this.props.stepThrough}>
					  Step Through
					</button>
                    <button className="btn btn-default" onClick={this.props.makeSpaceship}>
                      Make Spaceship
                    </button>
					<DropdownButton
						title="Grid Size"
						id="size-menu"
						onSelect={this.handleSelect}
					>
						<Dropdown.Item className="btn btn-default" eventKey="1">Small</Dropdown.Item>
						<Dropdown.Item className="btn btn-default" eventKey="2">Medium</Dropdown.Item>
						<Dropdown.Item className="btn btn-default" eventKey="3">Large</Dropdown.Item>
					</DropdownButton>
				</ButtonToolbar>
			</div>
			)
	}
}

export default Buttons