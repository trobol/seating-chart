import { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react'
import RemoteAction from '../RemoteAction';

const Seat = ({ index, name, x, y, selectSeat, selectedSeat, user, currentUser = false }) => {
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

	useEffect(() => {
		console.log('Updated: ' + index);
	}, [user]);
	return (
		<div style={positionStyle} className={`${selectedSeat === index ? 'active' : ''} seat-circle`} >
			<div className="seat-circle-icon" onClick={select}>
				{user ? <img src={'/static/users/' + user.image + '.jpg'} /> : ''}
				{index}
			</div>
			<div className="seat-circle-modal">
				{user === null ?
					<RemoteAction url="/api/seats/take" method="post" data={{ id: index }} title="Take" /> : <></>
				}
				<div>Reserve</div>

			</div>
		</div >
	);
};

export default Seat;