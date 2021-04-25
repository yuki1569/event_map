import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MyLocationIcon from '@material-ui/icons/MyLocation';


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

export default function MyLocationButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}
      <Fab aria-label="mylocation">
        <MyLocationIcon />
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