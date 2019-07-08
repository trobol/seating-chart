import {
  useRef, useEffect, createRef,
} from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { GraphColors } from '../Constants';

const PronounsChart = () => {
  const canvas = useRef(createRef());
  useEffect(() => {
    const canvasRef = canvas.current.getContext('2d');
    Promise.resolve(axios.get('/api/admin/metrics/pronouns')).then(((res) => {
      const { data, labels } = res.data;
      // eslint-disable-next-line no-new
      new Chart(canvasRef, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            backgroundColor: GraphColors,
            data,
          }],
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Pronouns Chart',
          },
        },
      });
    }));
  }, []);
  return (
    <div className="chart__container">
      <canvas ref={canvas} className="chart" />
      <style>
        {`
        .chart__container{
          position:relative;
          width: 50vw;
          height 50vh;
        }
      `}
      </style>
    </div>
  );
};

export default PronounsChart;
