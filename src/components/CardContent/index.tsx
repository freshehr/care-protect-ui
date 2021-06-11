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

const CardContent: React.FC<Props> = ({
  location,
  gender,
  birthDate,
  lastHeight,
  lastWeight,
  lastBmi,
}) => {
  console.log('Hello Ian');

  return (
    <Grid container>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {birthDate && <Text label="DOB">{birthDate}</Text>}
        {gender && <Text label="Gender">{gender}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {location && <Text label="Location">{location}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {lastHeight && <Text label="Height">{lastHeight}</Text>}
        {lastWeight && <Text label="Weight">{lastWeight}</Text>}
      </Grid>
      <Grid item lg={2} md={3} sm={4} xs={12}>
        {lastBmi && <Text label="BMI">{lastBmi}</Text>}
      </Grid>
    </Grid>
  );
};

export default CardContent;
