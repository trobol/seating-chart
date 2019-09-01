import { useState } from 'react';
import { Icon } from 'semantic-ui-react'
import style from './seat.css';

const Seat = ({ index, name, x, y, selectSeat, selectedSeat, user }) => {
	const positionStyle = {
		right: x + 'px',
		bottom: y + 'px'
	}
	function select() {
		if (selectedSeat === index)
			selectSeat(-1);
		else
			selectSeat(index);
	}
	return (
		<div style={positionStyle} className={`${selectedSeat === index ? 'active' : ''} seat-circle`} >
			<div className="seat-circle-icon" onClick={select}><img src={user ? user.img : ""} />{index}</div>
			<div className="seat-circle-modal">
				<div>Take</div>
				<div>Reserve</div>

			</div>
		</div >
	);
};

export default Seat;