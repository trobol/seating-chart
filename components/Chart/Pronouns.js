import {
  useRef, useEffect, createRef, useState,
} from 'react';
import Chart from 'chart.js';

const PronounsChart = () => {
  const canvas = useRef(createRef());
  const data = useState({});
  const options = useState({});
  useEffect(() => {
    const canvasRef = canvas.current.getContext('2d');
    // eslint-disable-next-line no-new
    new Chart(canvasRef, {
      type: 'pie',
      data,
      options,
    });
  }, [data, options]);
  return (
    <canvas ref={canvas} />
  );
};

export default PronounsChart;
