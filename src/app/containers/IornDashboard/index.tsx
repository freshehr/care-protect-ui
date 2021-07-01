import React from 'react';
import { Helmet } from 'react-helmet-async';
import Records from './Records';

export function IornDashboard() {
  return (
    <>
      <Helmet>
        <title>{'IoRN Dashboard'}</title>
        <meta name="description" content={'IorN Dashboard'} />
      </Helmet>
      <Records />
    </>
  );
}
