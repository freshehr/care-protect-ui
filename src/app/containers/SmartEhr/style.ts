import { makeStyles } from '@material-ui/core';
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
  closeButton: {
    marginRight: theme.spacing(2),
  },
  chip: {
    minWidth: '300px',
    margin: '0 auto',
  },
  fixed: {
    width: '100%',
    backgroundColor: '#fff',
    height: '128px',
    zIndex: 500,
    background: 'white',
    position: 'fixed',
    top: 65,
    left: 0,
  },
  santizedGrid: {
    minWidth: '100%',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: '35px',
    padding: '15px',
  },
}));
