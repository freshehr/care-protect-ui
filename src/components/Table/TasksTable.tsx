import React from 'react';
import { Box } from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import SortPoper from '../SortPoper';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Table as TableElement, ColumnBadged } from './style';

import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

type PropsBeforeStyle = {
  active: boolean;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: 'white',
      '&:hover': {
        color: '#e94e1b',
      },
      '&$active': {
        color: '#e94e1b',
      },
    },
    active: {
      color: '#e94e1b',
    },
    icon: {
      color: (props: PropsBeforeStyle) =>
        props.active ? '#e94e1b !important' : '#fff !important',
      '&$active': {
        color: '#e94e1b !important',
      },
    },
  });

const InteractiveTableSortLabel = withStyles(styles)(TableSortLabel);
const StyledTableSortLabel: React.FC<any> = props => {
  return <InteractiveTableSortLabel {...props} />;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
interface Props {
  children: React.ReactNode | React.ReactNode[];
  order?: any;
  orderBy?: any;
  onRequestSort?: any;
  filters?: any;
}
const Tasks: React.FC<Props> = ({
  children,
  order,
  orderBy,
  onRequestSort,
  filters,
}) => {
  const classes = useStyles();

  const createSortHandler = (property, currentOrder) => event => {
    const isAsc = currentOrder === 'asc';
    const newOrder = isAsc ? 'DESC' : 'ASC';
    onRequestSort({
      sort: { value: newOrder, key: property },
      filter: null,
    });
  };

  const getCurrentOrder = property =>
    orderBy === property && order === 'ASC' ? 'asc' : 'desc';

  return (
    <TableElement>
      <thead>
        <tr>
          <ColumnBadged center>
            <StyledTableSortLabel
              active={orderBy === 'name'}
              direction={getCurrentOrder('name')}
              onClick={createSortHandler('name', getCurrentOrder('name'))}
            >
              Names, NHS
              {true ? (
                <span className={classes.visuallyHidden}>
                  {'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </ColumnBadged>
          <ColumnBadged center>Location</ColumnBadged>

          <ColumnBadged center>Due</ColumnBadged>
          <ColumnBadged center>Task Type</ColumnBadged>

          <ColumnBadged center>Task</ColumnBadged>

          <ColumnBadged center>
            Status
            <SortPoper small icon={<FilterListIcon htmlColor="#fff" />}>
              <Box m={1} p={1}>
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                    />
                  }
                  label="Secondary"
                /> */}
              </Box>
            </SortPoper>
          </ColumnBadged>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableElement>
  );
};
export { Tasks };
