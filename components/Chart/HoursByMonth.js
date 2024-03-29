import { useRef, useEffect, createRef } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { GraphColors } from '../Constants';

const HoursByMonth = () => {
  const canvas = useRef(createRef());
  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/metrics/hours/year')).then((res) => {
      const { data, labels } = res.data;
      const canvasRef = canvas.current.getContext('2d');
      // eslint-disable-next-line no-new
      new Chart(canvasRef, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Hours Worked per Month',
              backgroundColor: GraphColors,
              data,
            },
          ],
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Total Hours Worked per Month ',
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    });
  }, []);
  return (
    <div className="chart__container">
      <canvas ref={canvas} className="chart" />
      <style>
        {`
        .chart__container{
          position:relative;
          width:50vw;
        }
      `}
      </style>
    </div>
  );
};

export default HoursByMonth;
