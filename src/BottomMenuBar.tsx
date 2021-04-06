import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import { useState } from "react";
import BookMarkModal from './ModalWindow'
import { dataBase } from '../lib/db'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // height: '7vh',
      top: 'auto',
      bottom: 0,
    },
    icon: {
      // textAlign: 'center'
    }
  }),
);

export default function BottomMenuBar() {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [db, setDb] = useState([{}]);
  const router = useRouter();


  const data2 = [
  {key1: 4, key2: 5, key3: 6},
  {key1: 10, key2: 20, key3: 30}
]

  return (
    <React.Fragment >
      <CssBaseline />
      <BookMarkModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} db={db} />
      
      <AppBar position="fixed" color="primary" 
        className={classes.appBar}
      >

        <div 
          style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '85%', height:'7vh',
           margin: '0 auto'
          }}>

          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => {
              router.push('/');
            }}
            >
            <LocationOnIcon />
          </IconButton>

          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => { setIsOpen(true); setDb(dataBase);}}
            >
            <SearchIcon />
          </IconButton>

          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => { setIsOpen(true); setDb(dataBase);}}
            >
            <FavoriteIcon />
          </IconButton>

          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => {
              router.push('/csr');
            }}
            >
            <PersonIcon fontSize={ 'default'}/>
          </IconButton>

          </div>

      </AppBar>
    </React.Fragment>
  );
}
