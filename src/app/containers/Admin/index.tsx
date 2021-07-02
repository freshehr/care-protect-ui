import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export function AdminPage() {
  return (
    <>
      <Helmet>
        <title>{'Admin Page'}</title>
        <meta name="description" content={'A Admin Page'} />
      </Helmet>
      <Wrapper display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">System Configuration</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">Settings</NavLink>
            <NavLink to="/#">Integration Management</NavLink>
            <NavLink to="/#">Site Management</NavLink>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">Core</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">Context</NavLink>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">User Menagment</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">List users</NavLink>
            <NavLink to="/#">Create user</NavLink>
            <NavLink to="/#">Site Management</NavLink>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">Resident Administration</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">Resident Management</NavLink>
            <NavLink to="/#">Add Resident</NavLink>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">Tool Manaagement</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">NEWS2</NavLink>
            <NavLink to="/#">DENWIS</NavLink>
            <NavLink to="/#">COVID</NavLink>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">Reports</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">Analytics</NavLink>
            <NavLink to="/#">Audit</NavLink>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">Documentation</Typography>
          <Box display="flex" flexDirection="column" ml={1}>
            <NavLink to="/#">Correspondence Management</NavLink>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Box)`
  width: 100%;
  background-color: #fff;
  top: 65;
  padding: 74px;
  border-radius: 35px;
`;
