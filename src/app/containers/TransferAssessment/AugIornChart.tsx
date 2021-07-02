import { Line } from 'react-chartjs-2';
import React from 'react';

export const AugIornChart = props => {
  const iornData = props.augIornData;

  const lineData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
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
      // {
      //   label: 'ADL score',
      //   data: iornData.map(iorn => {
      //     return iorn.adlScore.magnitude;
      //   }),
      //   fill: false,
      //   backgroundColor: 'rgb(255, 99, 132)',
      //   borderColor: 'rgba(255, 99, 132, 0.2)',
      //   yAxisID: 'y',
      //   min: 1,
      //   max: 15,
      // },
      {
        label: 'Frailty',
        data: iornData.map(iorn => {
          return iorn.cfs.ordinal;
        }),
        fill: false,
        backgroundColor: 'rgb(39, 129, 37)',
        borderColor: 'rgba(39, 129, 37, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'Augmented IORN Group',
        data: iornData.map(iorn => {
          return [iorn.group.ordinal - 0.5, iorn.group.ordinal + 0.5];
        }),
        fill: false,
        backgroundColor: 'rgb(33,55,221)',
        borderColor: 'rgba(33,55,221, 0.2)',
        yAxisID: 'y1',
        type: 'bar',
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
        position: 'right',
        title: {
          display: true,
          text: 'CFS / ADL',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          callback: label => {
            return label < 1 ? '' : String.fromCharCode(label + 64); //Convert ordinal to A-G
          },
        },

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: 'Augmented IoRN Group',
        },
      },
    },
  };

  return (
    <>
      <h1>Augmented ioRN</h1>
      <Line data={lineData} options={options} type={'bar'} />
    </>
  );
};
