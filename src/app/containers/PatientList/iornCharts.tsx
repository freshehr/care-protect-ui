import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

const dataAgg = {
  labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

  datasets: [
    {
      label: '2021',
      data: [17, 9, 9, 7, 12, 23, 12, 10],
      fill: false,
      backgroundColor: 'rgb(33, 55, 221)',
      borderColor: 'rgba(33, 55, 221, 0.2)',
      yAxisID: 'y',
    },
    {
      label: '2020',
      data: [17, 9, 9, 7, 12, 23, 12, 10],
      fill: false,
      yAxisID: 'y',
    },
  ],
};

const dataMix = {
  labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

  datasets: [
    {
      label: '2021',
      data: [17, 9, 9, 7, 12, 23, 12, 10],
      fill: false,
      backgroundColor: 'rgb(33, 55, 221)',
      borderColor: 'rgba(33, 55, 221, 0.2)',
      yAxisID: 'y',
    },
    {
      label: '2020',
      data: [17, 9, 9, 7, 12, 23, 12, 10],
      fill: false,
      yAxisID: 'y',
    },
  ],
};

const optionsAgg = {
  responsive: true,
  grid: {
    drawOnChartArea: false, // only want the grid lines for one axis to show up
  },
};

const optionsMix = {
  indexAxis: 'y',
  responsive: true,
  grid: {
    drawOnChartArea: false, // only want the grid lines for one axis to show up
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function IornCharts() {
  return (
    <div>
      <Grid
        alignItems="center"
        container
        direction="column"
        justify="space-between"
        style={{ height: '230px' }}
      >
        <Grid item xs={6} sm={6} md={6}>
          <h1>Aggregated ioRN</h1>
          <Bar data={dataAgg} options={optionsAgg} type={'bar'} />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <h1>Case mix</h1>
          <Bar data={dataMix} options={optionsMix} type={'bar'} />
        </Grid>
      </Grid>
    </div>
  );
}
