import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
    minHeight: 'calc(100vh - 95px)',
  },
  section: {
    backgroundColor: '#fff',
    border: '2px solid #fff',
    borderRadius: '35px',
    height: '100%',
    padding: '8px',
    margin: theme.spacing(1),
  },
  situationIlness: {
    backgroundColor: 'rgb(0, 172, 199, 35%)',
    border: '2px solid #8ECAD3',
  },
}));
