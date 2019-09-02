import { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react'
import RemoteAction from '../RemoteAction';


//TODO currently rendering everytime the parent is
const Seat = ({ index, seat, selectSeat, selectedSeat, currentUser = false }) => {
	const positionStyle = {
		right: seat.x + 'px',
		bottom: seat.y + 'px'
	}
	function select() {
		if (selectedSeat === index)
			selectSeat(-1);
		else
			selectSeat(index);
	}
	useEffect(() => {
		console.log('Updated: ' + index);
	}, [index]);
	return (
		<div style={positionStyle} className={`${selectedSeat === index ? 'active' : ''} seat-circle`} >
			<div className="seat-circle-icon" onClick={select}>
				{seat.state[0] ? <img src={'/static/users/' + seat.state[0].image + '.jpg'} /> : ''}
				{index}
			</div>
			<div className="seat-circle-modal">
				{seat.state[0] === null ?
					<RemoteAction url="/api/seats/take" method="post" data={{ id: index }} title="Take" /> : <></>
				}
				<div>Reserve</div>

			</div>
		</div >
	);
};

export default Seat;