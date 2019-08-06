import {
  useRef, useEffect, createRef, useState,
} from 'react';
import Chart from 'chart.js';
import useInterval from '../Util';

const HoursByWeek = () => {
  const canvas = useRef(createRef());
  const [data, setData] = useState([]);
  console.log('Hello World');
  useInterval(() => {

  }, 1000);
  useEffect(() => {
    const canvasRef = canvas.current.getContext('2d');
    // eslint-disable-next-line no-new
    new Chart(canvasRef, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Hours Worked per Week',
          backgroundColor: 'rgba(0,0,255,0.5)',
          pointBackgroundColor: 'rgba(0,0,255,0.5)',
          borderColor: 'rgba(0,0,255,0.5)',
          showLine: true,
          spanGaps: true,
          data: [10, 20, 30, 40, 50, 60],
        }],
        labels: ['Thursday', 'Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
            },
          }],
        },
      },
    });
  }, [data]);
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


export default HoursByWeek;
