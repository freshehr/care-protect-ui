import React from 'react';
import {
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from './style';
import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import Button from '../Button';
import BottomToolBar from './BottomTollBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccountCircle from '@material-ui/icons/AccountCircle';

import clsx from 'clsx';
import LogoDark from './assets/LogoDark.png';

interface Props {
  header?: string;
  children: React.ReactNode;
  login?: boolean;
  bottomToolBar?: boolean;
  username?: string;
  logout?: any;
  newLayout?: boolean;
}
const Layout: React.FC<Props> = ({
  header,
  children,
  login,
  username,
  logout,
  bottomToolBar,
  newLayout,
}) => {
  const classes = useStyles({ login });
  const theme = useTheme();
  const xsSM = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));

  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {header ? (
        <>
          <AppBar open={open}>
            <Toolbar className={classes.appBarHeight}>
              {!xsSM && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Box m={1}>
                <img height={40} src={LogoDark} alt="Care Protect logo" />
              </Box>
              <Typography variant="h6" className={classes.title}>
                {header}
              </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Typography>Hello {username}</Typography>
                  <MenuItem>
                    <Button.Secondary variant="contained" onClick={logout}>
                      Log out
                    </Button.Secondary>
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>

          <Drawer onClose={handleDrawerClose} open={open} />

          <main
            className={clsx(classes.content, classes.withDrawer, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {children}
          </main>
          {bottomToolBar &&
            (xsSM ? (
              <BottomToolBar />
            ) : (
              <footer
                className={clsx(classes.footer, {
                  [classes.contentShift]: open,
                })}
              >
                © 2020 Company. All rights reserved.
              </footer>
            ))}
        </>
      ) : (
        <>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: false,
            })}
          >
            {!newLayout && <div className={classes.drawerHeader} />}
            {children}
          </main>
        </>
      )}
    </div>
  );
};
export default Layout;
