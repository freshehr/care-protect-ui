import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import axios, { AxiosRequestConfig } from 'axios';

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

const aql =
  'SELECT \n' +
  '       c/uid/value as uid,\n' +
  '       e/ehr_id/value as ehrId,\n' +
  '       c/context/start_time/value as obsDate,\n' +
  '       u/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude AS Height,\n' +
  '       i/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude AS Weight,\n' +
  '       w/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude AS Body_mass_index,\n' +
  '       o/data[at0001]/events[at0002]/data[at0003]/items[at0015]/value/magnitude AS Total_score,\n' +
  '       b/data[at0001]/events[at0002]/data[at0003]/items[at0079]/value/defining_code/code_string AS AIorNGroup,\n' +
  '             b/data[at0001]/events[at0002]/data[at0003]/items[at0079]/value/value AS AIorNGroupText,\n' +
  '       f/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value AS CFS,\n' +
  '       f/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/symbol/value AS CFSText\n' +
  "FROM EHR e[ehr_id/value = '3e674739-950c-4b8a-976b-5aef21c618c5']\n" +
  'CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.report.v1] \n' +
  'CONTAINS (OBSERVATION u[openEHR-EHR-OBSERVATION.height.v2] or OBSERVATION i[openEHR-EHR-OBSERVATION.body_weight.v2] or OBSERVATION w[openEHR-EHR-OBSERVATION.body_mass_index.v2] or OBSERVATION o[openEHR-EHR-OBSERVATION.must.v0] and OBSERVATION b[openEHR-EHR-OBSERVATION.augmented_iorn.v0] or OBSERVATION f[openEHR-EHR-OBSERVATION.clinical_frailty_scale.v1])\n' +
  "WHERE c/name/value = 'Transfer assessment'\n" +
  'ORDER BY c/context/start_time/value ASC';

export function IornCharts() {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://cdr.code4health.org/rest/openehr/v1/query/aql',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Basic YTgxZjQ3YzYtYTc1Ny00ZTM0LWI2NDQtM2NjYzYyYjRhMDFjOiQyYSQxMCQ2MTlraQ==',
    },
    data: JSON.stringify({ q: aql }),
  };

  // At the beginning, posts is an empty array
  const [resultSet, setResultSet] = useState([]);

  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios(config);
    setResultSet(data.rows);
  };

  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

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
      <pre>{JSON.stringify(resultSet, null, 2)}</pre>
    </div>
  );
}
