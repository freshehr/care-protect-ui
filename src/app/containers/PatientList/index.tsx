import React from 'react';
import { Helmet } from 'react-helmet-async';

import Records from './Records';
import { Line } from 'react-chartjs-2';
import { IornCharts } from './iornCharts';

export function PatientList() {
  return (
    <>
      <Helmet>
        <title>{'Patient List'}</title>
        <meta name="description" content={'A Patient List'} />
      </Helmet>
      <Records />
    </>
  );
}
