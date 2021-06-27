import React from 'react';
import {} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { Table as TableElement, ColumnBadged } from './style';

import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { SepsisIconBadget } from '../SepsisIcon';
import SortPoper from '../SortPoper';
import { CovidIconBadget } from '../CovidIcon';
import Sort from '../Sort';

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
  order: any;
  orderBy: any;
  onRequestSort: any;
  filters: any;
}
const Table: React.FC<Props> = ({
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

  const SEPSIS_FLAG = filters.filter?.sepsis?.value || 'white';

  const COVID_FLAG = filters.filter?.covid?.value || 'white';
  return (
    <TableElement>
      <thead>
        <tr>
          <ColumnBadged center>Location</ColumnBadged>
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
          <ColumnBadged center>
            <StyledTableSortLabel
              active={orderBy === 'iorn'}
              direction={getCurrentOrder('iorn')}
              onClick={createSortHandler('iorn', getCurrentOrder('iorn'))}
            >
              IORN
              {true ? (
                <span className={classes.visuallyHidden}>
                  {'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </ColumnBadged>
          <ColumnBadged center>
            <StyledTableSortLabel
              active={orderBy === 'denwis'}
              direction={getCurrentOrder('denwis')}
              onClick={createSortHandler('denwis', getCurrentOrder('denwis'))}
            >
              DENWIS
              {true ? (
                <span className={classes.visuallyHidden}>
                  {'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </ColumnBadged>
          <ColumnBadged center>
            COVID
            <SortPoper
              size="small"
              icon={
                <CovidIconBadget
                  value={{
                    suspectedCovidStatus: COVID_FLAG,
                    dateIsolationDueToEnd: null,
                    covidTestRequest: null,
                  }}
                />
              }
            >
              <Sort
                onFilterSort={onRequestSort}
                defaultValues={filters}
                covid
              />
            </SortPoper>
          </ColumnBadged>
          <ColumnBadged center>
            SEPSIS
            <SortPoper
              size="small"
              icon={<SepsisIconBadget value={{ value: SEPSIS_FLAG }} />}
            >
              <Sort
                onFilterSort={onRequestSort}
                defaultValues={filters}
                sepsis
              />
            </SortPoper>
          </ColumnBadged>
          <ColumnBadged center>
            <StyledTableSortLabel
              active={orderBy === 'news2'}
              direction={getCurrentOrder('news2')}
              onClick={createSortHandler('news2', getCurrentOrder('news2'))}
            >
              NEWS2
              {true ? (
                <span className={classes.visuallyHidden}>
                  {'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </ColumnBadged>
          <ColumnBadged center>Action</ColumnBadged>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableElement>
  );
};
export { Table };
