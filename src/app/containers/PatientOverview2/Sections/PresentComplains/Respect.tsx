import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';

export const Respect = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <Typography display="inline" variant="subtitle1" component="div">
          {'Legal Welfare Proxy: '}
        </Typography>
        <Box mr={1} />
        <Typography variant="subtitle2" component="div">
          Yes
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <Typography display="inline" variant="subtitle1" component="div">
          {'Emergency Contact: '}
        </Typography>
        <Box mr={1} />
        <Typography variant="subtitle2" component="div">
          Name Surname
        </Typography>
      </Box>
      <Box mb={2} display="flex" flexDirection="row">
        <Box
          display="flex"
          flexDirection="row"
          alignContent="center"
          alignItems="center"
          width="50%"
        >
          <Typography display="inline" variant="subtitle1" component="div">
            {'Role/Relationship: '}
          </Typography>
          <Box mr={1} />
          <Typography variant="subtitle2" component="div">
            Carer
          </Typography>
        </Box>
        <Box
          width="50%"
          display="flex"
          flexDirection="row-reverse"
          alignContent="flex-end"
          alignItems="flex-end"
        >
          <Typography variant="subtitle2" component="div">
            21234 43212 34
          </Typography>
          <Box mr={1} />
          <Typography display="inline" variant="subtitle1" component="div">
            Tel:
          </Typography>
        </Box>
      </Box>

      <Divider />
      <Box mt={2} />
      <Typography
        gutterBottom
        align="center"
        variant="subtitle1"
        color="textSecondary"
      >
        Clinical Recommendations
      </Typography>

      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
        mt={2}
      >
        <Typography display="inline" variant="subtitle1" component="div">
          Care Priority:
        </Typography>
        <Box mr={1} />
        <Typography variant="subtitle2" component="div">
          Extend Life
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <Typography display="inline" variant="subtitle1" component="div">
          Attempt CPR:
        </Typography>
        <Box mr={1} />
        <Typography variant="subtitle2" component="div">
          Yes
        </Typography>
      </Box>
      <Box flexDirection="column" mt={2}>
        <Typography variant="subtitle1">Clinical Guidance:</Typography>
        <Typography variant="subtitle2">
          Up to 256 characters of text that is not read only and provides
          guidance on how to clinically care for this person
        </Typography>
      </Box>
    </Box>
  );
};
