import { makeStyles } from '@material-ui/core';
const DRAWER_WIDTH = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '120px',
    marginBottom: '100px',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginTop: '120px',
      marginBottom: '50px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '120px',
      marginBottom: '50px',
    },
    [theme.breakpoints.down(600)]: {
      marginTop: '216px',
    },
  },
  chip: {
    minWidth: '300px',
    margin: '0 auto',
  },
  fixed: {
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 500,
    background: 'white',
    position: 'fixed',
    top: 65,
    left: 0,
  },
  santizedGrid: {
    minWidth: '100%',
  },
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
}));
