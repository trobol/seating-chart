import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import Seats from './Seats';
import Def from './Def';
import BackgroundMap from './BackgroundMap';
import Title from './Title';
import useInterval from '../Util';
import style from './seat-map.css';

/*
Seating Map

map-inner will expand to fill map-container
while maintaining its aspect ratio dictated by height and width.
Seat elements positioned relative to the lower right.


*/
const mapWidth = 2790, mapHeight = 1145;


function Seat(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
}
const seatPositions = [
    new Seat(2278, 860, 'Reseach-01'),
    new Seat(2081, 860, 'Reseach-02'),
    new Seat(1884, 860, 'Reseach-03'),
    new Seat(1687, 860, 'Reseach-04'),
    new Seat(1490, 860, 'Reseach-05'),
    new Seat(2345, 420, 'Reseach-06'),
    new Seat(2345, 240, 'Reseach-07'),
    new Seat(2345, 60, 'Reseach-08'),
    new Seat(2215, 420, 'Reseach-09'),
    new Seat(2215, 240, 'Reseach-10'),
    new Seat(2215, 60, 'Reseach-11'),
    new Seat(1850, 420, 'Reseach-12'),
    new Seat(1850, 240, 'Reseach-13'),
    new Seat(1850, 60, 'Reseach-14'),
    new Seat(1720, 420, 'Reseach-15'),
    new Seat(1720, 240, 'Reseach-16'),
    new Seat(1720, 60, 'Reseach-17'),
    new Seat(1295, 365, 'Reseach-18'),
    new Seat(1360, 240, 'Reseach-19'),
    new Seat(1360, 60, 'Reseach-20'),
    new Seat(1230, 240, 'Reseach-21'),
    new Seat(1230, 60, 'Reseach-22'),
    new Seat(700, 1000, 'Reseach-23'),
    new Seat(450, 1000, 'Reseach-24'),
    new Seat(200, 1000, 'Reseach-25'),
    new Seat(50, 750, 'Reseach-26'),
    new Seat(200, 475, 'Reseach-27'),
    new Seat(375, 475, 'Reseach-28'),
    new Seat(550, 475, 'Reseach-29'),
    new Seat(1185, 860, 'Reseach-30'),
    new Seat(735, 30, 'Reseach-31'),
    new Seat(35, 30, 'Reseach-32')
];


const SeatingMap = ({ seats }) => {
    const [data, setData] = useState({});

    useInterval(() => {
        axios.get('/api/seats')
            .then((response) => {
                if (response.status !== 200) return;
                const { users } = response.data;
                if (users) {
                    setData(users);
                    console.log(users);
                }
            });
    }, 4000);

    useEffect(() => { window.addEventListener('resize', resizeMap); resizeMap() }, []);

    const innerRef = useRef(null),
        containerRef = useRef(null);
    const innerSize = {
        width: mapWidth + 'px',
        height: mapHeight + 'px'
    }
    function resizeMap() {
        let scale = Math.min(
            containerRef.current.offsetWidth / mapWidth,
            containerRef.current.offsetHeight / mapHeight
        );
        innerRef.current.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
    }



    const [selectedSeat, selectSeat] = useState(-1);
    const seatStates = [];
    const seatCirclesNode = seatPositions.map((seat, index) => {
        seatStates[index] = useState(null);
        return <SeatNode key={index} index={index} name={seat.name} x={seat.x} y={seat.y} active={false} selectSeat={selectSeat} selectedSeat={selectedSeat} user={seatStates[index][0]} />;
    });

    useEffect(() => {
        for (let i = 0; i < seats.length; i++) {

        }
    }, [seats]);


    return (
        <div ref={containerRef} className="map-container">
            <div ref={innerRef} style={innerSize} className="map-inner">
                <img className="map-background" src="/static/layout.svg"></img>
                {seatCirclesNode}
            </div>
        </div>
    );
};


export default SeatingMap;
