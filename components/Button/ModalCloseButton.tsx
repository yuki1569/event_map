import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function ModalCloseButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}
      <Fab aria-label="mylocation">
        <KeyboardArrowDownIcon />
      </Fab>
      {/* <Fab variant="extended">
        <NavigationIcon className={classes.extendedIcon} />
        Navigate
      </Fab> */}
      {/* <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab> */}
    </div>
  );
}