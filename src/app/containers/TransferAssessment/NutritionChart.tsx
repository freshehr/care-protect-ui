import { nutritionData } from './datamodels/nutrition-aql.json';
import { Line } from 'react-chartjs-2';
import React from 'react';

const lineData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Ap',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'Weight',
      data: nutritionData.map(function (nutrition) {
        return nutrition.weight.magnitude;
      }),
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y',
    },
    {
      label: 'MUST Score',
      data: nutritionData.map(function (nutrition) {
        return nutrition.mustScore.magnitude;
      }),
      fill: false,
      backgroundColor: 'rgb(39, 129, 37)',
      borderColor: 'rgba(39, 129, 37, 0.2)',
      yAxisID: 'y1',
    },
  ],
};

const options = {
  responsive: true,
  stacked: false,
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      min: 0,
      max: 10,

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

export const NutritionChart = () => (
  <>
    <h1>Nutrition</h1>
    <Line data={lineData} options={options} type={'bar'} />
  </>
);
