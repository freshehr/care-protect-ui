import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@material-ui/core';
import Header from '../Patient/Header';
import Sections from './Sections/';

export function PatientOveriview2() {
  return (
    <>
      <Helmet>
        <title>Patient Summary</title>
        <meta name="description" content="A Patient Summary" />
      </Helmet>
      <Header title={'Patient Summary'} />
      <Sections />
    </>
  );
}
