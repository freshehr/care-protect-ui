import React from 'react';
import { Box, Typography } from '@material-ui/core';
import VeryFit from 'app/containers/Assessment/isbarContent/assests/very-fit.jpeg';
import Well from 'app/containers/Assessment/isbarContent/assests/well.jpeg';
import ManagingWell from 'app/containers/Assessment/isbarContent/assests/managing-well.jpeg';
import Vulnerable from 'app/containers/Assessment/isbarContent/assests/vulnerable.jpeg';
import MildlyFrail from 'app/containers/Assessment/isbarContent/assests/mildly-frail.jpeg';
import ModeratelyFrail from 'app/containers/Assessment/isbarContent/assests/moderately-frail.jpeg';
import SeverelyFrail from 'app/containers/Assessment/isbarContent/assests/severely-frail.jpeg';
import VerySeverelyFrail from 'app/containers/Assessment/isbarContent/assests/very-severely-frail.jpeg';
import TerminallyIll from 'app/containers/Assessment/isbarContent/assests/terminally-ill.jpeg';

export const HealthCondition = () => {
  const FRALITY = {
    at0005: VeryFit,
    at0006: Well,
    at0007: ManagingWell,
    at0008: Vulnerable,
    at0009: MildlyFrail,
    at0010: ModeratelyFrail,
    at0011: SeverelyFrail,
    at0012: VerySeverelyFrail,
    at0013: TerminallyIll,
  };
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <Typography display="inline" variant="subtitle1" component="div">
          {'Frailty Score: '}
        </Typography>
        <Box mr={1} />
        <Typography variant="subtitle2" component="div">
          Very Fit
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box flexShrink={6}>
          <Typography>
            People who are robust, active, energetic and motivated. These people
            commonly exercise regularly. They are among the fittest for their
            age.
          </Typography>
        </Box>
        <Box>
          <img src={FRALITY['at0005']} alt="very fit" />
        </Box>
      </Box>
    </Box>
  );
};
