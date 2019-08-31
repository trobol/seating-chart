import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import Seats from './Seats';
import Def from './Def';
import BackgroundMap from './BackgroundMap';
import Title from './Title';
import useInterval from '../Util';


/*
Seating Map

map-inner will expand to fill map-container
while maintaining its aspect ratio dictated by height and width.
Seat elements positioned relative to the lower right.


*/
const SeatingMap = ({ link }) => {
    const [data, setData] = useState(null);
    useInterval(() => {
        Promise.resolve(axios.get(link)).then((res) => {
            try {
                const { seats } = res.data;
                if (!_.isEqual(data, seats)) {
                    console.log({ seats });
                    setData(seats);
                }
            } catch (error) {
                console.error({ error });
            }
        });
    }, 1500);

    useEffect(() => {window.addEventListener('resize', resizeMap); resizeMap()}, []);
    const mapWidth = 2790, mapHeight = 1145;
    const innerRef = useRef(null),
        containerRef = useRef(null);
    function resizeMap() {
        let scale = Math.min(
            containerRef.current.offsetWidth / mapWidth,
            containerRef.current.offsetHeight / mapHeight
        );
        innerRef.current.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
    }

    return (    
        <>
            <div ref={containerRef} className="map-container">
                <div ref={innerRef} className="map-inner">
                    <img className="map-background" src="/static/layout.svg"></img>
                        <Seats/>
                </div>
            </div>
            <style>
                {`
            .map-container {
              width:100vw;
              height:100vh;
            }
            .map-inner {
                position:relative;
                width:${mapWidth}px;
                height:${mapHeight}px;
                left: 50%;
                top: 50%;
                -webkit-transform-origin: center center;
                        transform-origin: center center;
            }
            .map-background {
                width:100%;
                height:100%;
                position:absolute;
                right:0;
                bottom:0;
            }
      `}
            </style>
        </>
    );
};

SeatingMap.propTypes = {
    link: PropTypes.string.isRequired,
};
export default SeatingMap;
