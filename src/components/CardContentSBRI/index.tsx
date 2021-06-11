import React from 'react';
import { Grid } from '@material-ui/core';
import Text from '../Text/';

interface Props {
  birthDate?: string;
  location?: string;
  gender?: string;
  lastHeight?: string;
  lastWeight?: string;
  lastBmi?: string;
}

const CardContentSBRI: React.FC<Props> = ({ location, gender, birthDate }) => {
  return (
    <Grid container>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {birthDate && <Text label="DOB">{birthDate}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {gender && <Text label="Gender">{gender}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {location && <Text label="Location">{location}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {location && <Text label="Location">{location}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {location && <Text label="Location">{location}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {location && <Text label="Location">{location}</Text>}
      </Grid>
    </Grid>
  );
};

export default CardContentSBRI;
