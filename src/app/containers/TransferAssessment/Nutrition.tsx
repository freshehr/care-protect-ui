import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
  Card,
  CardActions,
  CardContent,
  Slider,
} from '@material-ui/core';

import {
  selectCovidStatus,
  selectCovidStatusDate,
  selectResultCS,
  selectID,
} from './selectors';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './slice';
import { Button, NativeSelect, Dialog, DialogTitle, Spinner } from 'components';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { formatDate } from '../../../utils/formatters/time';
import { NutritionChart } from './NutritionChart';
import { NutritionCard } from './NutritionCard';

export function Nutrition(props: { resultSet: any }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const resultSet = props.resultSet;

  if (resultSet === undefined || resultSet.length == 0) return null;

  const nutritionData: any = resultSet.map(row => {
    const out: any = {
      height: {
        magnitude: row[3],
        units: 'cm',
        date: row[2],
      },
      weight: {
        magnitude: row[4],
        units: 'kg',
        date: row[2],
      },
      bmi: {
        magnitude: row[5],
        units: 'kg/cm2',
        date: row[2],
      },
      mustScore: {
        magnitude: row[6],
        date: row[2],
      },
    };

    return out;
  });

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      style={{ height: `${small ? 'auto' : large ? '100%' : '800px'}` }}
    >
      <Grid item>
        <NutritionChart nutritionData={nutritionData} />
      </Grid>
      <Grid item>
        <NutritionCard nutritionData={nutritionData} />
      </Grid>
    </Grid>
  );
}
