import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import uniqid from 'uniqid';

import { patientListFromSaga } from './saga';
import { sliceKey, actions, reducer } from './slice';

import {
  selectPatients,
  selectError,
  selectLoading,
  selectFilters,
} from './selectors';

import { Box, List, Toolbar, Grid, Typography } from '@material-ui/core';
import { Card, CardContent, SortPoper, Sort, Spinner } from 'components';
import { useStyles } from './styles';
import Search from '../SearchPatientRecord';
import { IornCharts } from './iornCharts';

const Records = () => {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: patientListFromSaga });
  const classes = useStyles();
  const ref = React.useRef(null);

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patients = useSelector(selectPatients);
  const filters = useSelector(selectFilters);

  React.useEffect(() => {
    dispatch(actions.loadRecords({ sort: { value: 'DESC', key: 'news2' } }));
  }, [dispatch]);

  const handleSortFilter = React.useCallback(
    filters => {
      dispatch(actions.addFilters(filters));
      dispatch(actions.loadRecords(filters));
    },
    [dispatch],
  );

  return (
    <>
      <div className={classes.fixed} ref={ref}>
        <Toolbar>
          <Grid direction="row" alignItems="center" container>
            <Grid item xs={10} sm={11} md={11}>
              <Search />
            </Grid>

            <Grid item xs={10} sm={11} md={11}>
              <IornCharts />
            </Grid>
            <Grid item>
              <SortPoper>
                <Sort
                  sort
                  sepsis
                  covid
                  onFilterSort={handleSortFilter}
                  defaultValues={filters}
                />
              </SortPoper>
            </Grid>
          </Grid>
        </Toolbar>
      </div>
      <Box m={1} mb={8} style={{ marginTop: '50px' }}>
        {error && <p>{error}</p>}
        {isLoading && <Spinner />}
        {patients?.length > 0 ? (
          <>
            <List>
              {patients.map(
                ({
                  name,
                  nhsnumber,
                  birthDate,
                  gender,
                  location,
                  assessment,
                  id,
                }) => (
                  <Box key={uniqid()}>
                    <Card
                      name={name}
                      identifier={nhsnumber}
                      assesments={assessment}
                      id={id}
                    >
                      <CardContent
                        birthDate={birthDate}
                        gender={gender}
                        location={location}
                      />
                    </Card>
                  </Box>
                ),
              )}
            </List>
          </>
        ) : (
          <Typography>There are no such records.</Typography>
        )}
      </Box>
    </>
  );
};
export default Records;
