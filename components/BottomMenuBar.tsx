import { useRouter } from 'next/router'
import React ,{ useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import MapIcon from '@material-ui/icons/Map';
import { auth, fireStoreDB, firebaseUser } from '../src/firebase';
import AddButtons from './Button/AddButton';
import ModalAddWindow from './ModalAddWidow'

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

export default function BottomMenuBar(
  props,
  modalHidden,

) {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);
  const router = useRouter();
  

  return (
    <React.Fragment >
      <div>
      <ModalAddWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
      </div>
      {/* <CssBaseline /> */}

      <div
        style={{
          position: 'fixed',
          zIndex:20,
          right:'10px',
          bottom: '8vh',
          
        }}
        onClick={() => {
          setIsOpen(!modalIsOpen);
        }}
      >
      <AddButtons />
      </div>
      
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
              props.setmodallHidden(true);
              
            }}
            >
            <MapIcon />
          </IconButton>

          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => {
              router.push('/');
              props.setmodallHidden(!modalHidden)
              // setIsOpen(!modalIsOpen);
              // setIsOpenBookMark(false);
              // setDb(eventDB);
              // router.push('/csr/eventList');
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => {
              // setIsOpenBookMark(true);
              // setIsOpen(false);
              auth.currentUser
              router.push('/csr/bookMark');
            }}
            >
            <FavoriteIcon />
          </IconButton> */}

          <IconButton
            color="inherit"
            className={classes.icon}
            onClick={() => {
              router.push('/csr/login');
              props.setmodallHidden(true);
            }}
            >
            <PersonIcon fontSize={ 'default'}/>
          </IconButton>

          </div>

      </AppBar>
    </React.Fragment>
  );
}
