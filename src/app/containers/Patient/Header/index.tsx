import React from 'react';
import { AppBar } from 'components/Layout/AppBar';
import {
  Toolbar,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePatientSlice } from '../slice';
import { selectDOB, selectName, selectNHS } from '../selectors';

interface Props {
  children?: React.ReactNode;
}
const SubPageTopBar: React.FC<Props> = ({ children }) => {
  return (
    <AppBar open={false} color="inherit">
      {children}
    </AppBar>
  );
};
const Header: React.FC<{ title: string; returnTo?: boolean }> = ({
  title,
  returnTo,
}) => {
  const { actions } = usePatientSlice();

  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints?.down('md'));
  const downSm = useMediaQuery(theme.breakpoints?.only('xs'));
  const history = useHistory();

  const close = () => history.push('/');
  const goBack = () => history.push(`${returnTo}${id}`);
  const params = useParams();
  const id = (params as any)?.id;
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const identifier = useSelector(selectNHS);
  const dob = useSelector(selectDOB);
  React.useEffect(() => {
    dispatch(actions.loadPatient(id));
  }, [actions, dispatch, id]);

  return (
    <SubPageTopBar>
      <Toolbar>
        {returnTo ? (
          <IconButton color="inherit" onClick={goBack} edge="start">
            <ArrowBackIcon htmlColor="#000" />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={close} edge="start">
            <CloseIcon htmlColor="#000" />
          </IconButton>
        )}
        <Box display="flex" flexDirection="column">
          <Typography component="div" variant={downMd ? 'h6' : 'h5'} noWrap>
            {title}
          </Typography>
          <Box display="flex" flexDirection={downSm ? 'column' : 'row'}>
            <Typography
              component="div"
              variant={downMd ? 'body2' : 'h6'}
              color="textSecondary"
            >
              <Box fontWeight="bold" mr={1}>
                Name:
              </Box>
            </Typography>
            <Typography
              component="div"
              noWrap
              variant={downMd ? 'body2' : 'h6'}
            >
              {name}
            </Typography>
          </Box>
        </Box>
        {/* <Box m={1}>
          <Typography variant={downMd ? 'h6' : 'h4'} display="block" noWrap>
            {title}
          </Typography>
        </Box> */}
        {!returnTo && (
          <Box display="flex" flexDirection="column">
            <Box ml={1} display="flex" flexDirection="row">
              <Typography color="textSecondary">
                <Box fontWeight="bold" mr={1}>
                  NHS:
                </Box>
              </Typography>
              <Typography variant="body1">{identifier}</Typography>
            </Box>
            <Box ml={1} display="flex" flexDirection="row">
              <Typography color="textSecondary">
                <Box fontWeight="bold" mr={1}>
                  DOB:
                </Box>
              </Typography>
              <Typography variant="body1">{dob}</Typography>
            </Box>
          </Box>
        )}
      </Toolbar>
    </SubPageTopBar>
  );
};

export default Header;
