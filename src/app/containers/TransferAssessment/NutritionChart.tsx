import { nutritionData } from './datamodels/nutrition-aql.json';
import { Bar, Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Grid } from '@material-ui/core';
import theme from '../../../styles/theme';

export const NutritionChart = props => {
  if (props.nutritionData === undefined) return null;

  const lineChartSetup = {
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
        data: props.nutritionData.map(function (nutrition: any) {
          return nutrition.weight.magnitude;
        }),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'MUST Score',
        type: 'bar',
        data: props.nutritionData.map(function (nutrition: any) {
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

  return (
    <>
      <h1>Nutrition</h1>
      <Line data={lineChartSetup} options={options} type={'bar'} />
    </>
  );
};
