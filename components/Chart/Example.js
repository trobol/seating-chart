import { useRef, useEffect, createRef } from 'react';
import Chart from 'chart.js';
import GraphColors from '../Constants';

const MyChart = () => {
  const canvas = useRef(createRef());
  useEffect(() => {
    const canvasRef = canvas.current.getContext('2d');
    // eslint-disable-next-line no-new
    new Chart(canvasRef, {
      type: 'bar',
      data: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: [GraphColors],
            data: [2478, 5267, 734, 784, 433],
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050',
        },
      },
    });
  }, []);
  return (
    <canvas ref={canvas} />
  );
};

export default MyChart;
