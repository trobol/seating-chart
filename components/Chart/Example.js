import { useRef, useEffect, createRef } from 'react';
import Chart from 'chart.js';

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
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
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
