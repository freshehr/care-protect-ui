import React from 'react';
import {
  Drawer as MuiDrawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewListIcon from '@material-ui/icons/ViewList';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useStyles } from '../style';

interface Props {
  open: boolean;
  onClose: any;
}
export const Drawer: React.FC<Props> = ({ open, onClose }) => {
  const history = useHistory();
  const classes = useStyles({});
  const theme = useTheme();

  const location = useLocation();
  const { pathname } = location;
  const [navPath, setNavPath] = React.useState(pathname);

  React.useEffect(() => {
    setNavPath(pathname);
  }, [pathname]);
  const handleChange = e => {
    history.push(e.currentTarget.id);
  };
  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          selected={navPath === '/'}
          button
          key={'/'}
          id={'/'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/' ? classes.selected : undefined}
          >
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText
            className={navPath === '/' ? classes.selected : undefined}
            primary={'Patients'}
          />
        </ListItem>
        <ListItem
          button
          key={'/dashboard'}
          id={'/dashboard'}
          selected={navPath === '/dashboard'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/dashboard' ? classes.selected : undefined}
          >
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText
            className={navPath === '/dashboard' ? classes.selected : undefined}
            primary={'Acuity Dashboard'}
          />
        </ListItem>
        <ListItem
          button
          key={'/tasks'}
          selected={navPath === '/tasks'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/tasks' ? classes.selected : undefined}
          >
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Tasks'}
            className={navPath === '/tasks' ? classes.selected : undefined}
          />
        </ListItem>
        <ListItem
          button
          key={'/iorn-dashboard'}
          id={'/iorn-dashboard'}
          selected={navPath === '/iorn-dashboard'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={
              navPath === '/iorn-dashboard' ? classes.selected : undefined
            }
          >
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary={'IORN Dashboard'}
            className={
              navPath === '/iorn-dashboard' ? classes.selected : undefined
            }
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={'/admin'}
          id="/admin"
          selected={navPath === '/admin'}
          onClick={handleChange}
        >
          <ListItemIcon
            className={navPath === '/admin' ? classes.selected : undefined}
          >
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Admin'}
            className={navPath === '/admin' ? classes.selected : undefined}
          />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};
