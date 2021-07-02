import React from 'react';
import { AppBar as MuiAppBar } from '@material-ui/core';
import { useStyles } from '../style';
import clsx from 'clsx';
interface Props {
  children: React.ReactNode | React.ReactNode[];
  open?: boolean;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent';
}
export const AppBar: React.FC<Props> = ({ children, open, color }) => {
  const classes = useStyles({});
  return (
    <MuiAppBar
      position="fixed"
      color={color}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      {children}
    </MuiAppBar>
  );
};
