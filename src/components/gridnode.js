import React from 'react';
import './components.css';

class Gridnode extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={() => this.props.playing === false ? this.selectBox() : alert("Must be paused to edit")}
			/>
		);
	}
}
export default Gridnode