import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import {  auth, fireStoreDB, firebaseUser } from '../src/firebase';
import 'firebase/functions';

const useStyles = makeStyles((theme) => ({
  textField: {
    display: 'flex',
    width: '80%',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function AddForm() {
  const classes = useStyles();
  const [sendData, setSendData] = useState({
    place: '',
    title: '',
    subTitle: '',
    link:'',
    period:'',
    genre:'',
    genre2:'',
    email: '',
    name: '',
    contents: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarInfo, setSnackBarInfo] = useState({
    severity: '',
    message: ''
  });

  //  Submit Button
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    
    fireStoreDB.collection('createEvent').add(
      {
      uid: firebaseUser().uid,
      id: Math.random() * 100000,
      title: sendData.title,
      subTitle:sendData.subTitle,
      // thumbnail: sendData.thumbnail,
      link: sendData.link,
      contents: sendData.contents,
      period: sendData.period,
      genre: sendData.genre,
      genre2: sendData.genre2,
      streetAddress: sendData.place,
      }
    )
      .then(() => {
        setSnackBarInfo({
          severity: 'success', message: 'お問い合わせありがとうございます。送信完了しました。'
        });
        setSnackBarOpen(true);
        console.log('Successed send mail.');
        // setSendData({
        //   email: '', name: '', content: ''  
        // });
      })
      .catch(err => {
        setSnackBarInfo({
          severity: 'error', message: '送信に失敗しました。時間をおいて再度お試しください。'
        });
        setSnackBarOpen(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  };
  // //  Submit Button
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   let sendMail = firebase.functions().httpsCallable('sendMail');
  //   sendMail(sendData)
  //     .then(() => {
  //       setSnackBarInfo({
  //         severity: 'success', message: 'お問い合わせありがとうございます。送信完了しました。'
  //       });
  //       setSnackBarOpen(true);
  //       console.log('Successed send mail.');
  //       setSendData({
  //         email: '', name: '', content: ''  
  //       });
  //     })
  //     .catch(err => {
  //       setSnackBarInfo({
  //         severity: 'error', message: '送信に失敗しました。時間をおいて再度お試しください。'
  //       });
  //       setSnackBarOpen(true);
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     })
  // };

  //  Change TextField
  const handleChange = e => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };

  //  Close SnackBar
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  }

  return (
    <main>
      <Container maxWidth="sm" className={classes.contactForm}>
        <Typography variant="h4" component="h1" gutterBottom>
          
        </Typography>
        <TextField 
          name="place" label="place" type="text" required
          className={classes.textField} value={sendData.place} onChange={handleChange}
        />
        <TextField 
          name="title" label="title" type="text" required
          className={classes.textField} value={sendData.title} onChange={handleChange}
        />
        <TextField 
          name="subTitle" label="subTitle" type="text" required
          className={classes.textField} value={sendData.subTitle} onChange={handleChange}
        />
        <TextField 
          name="link" label="link" type="text" required
          className={classes.textField} value={sendData.link} onChange={handleChange}
        />
        <TextField 
          name="period" label="period" type="text" required
          className={classes.textField} value={sendData.period} onChange={handleChange}
        />
        <TextField 
          name="genre" label="genre" type="text" required
          className={classes.textField} value={sendData.genre} onChange={handleChange}
        />
        <TextField 
          name="genre2" label="genre2" type="text" required
          className={classes.textField} value={sendData.genre2} onChange={handleChange}
        />
        {/* <TextField 
          name="email" label="メールアドレス" type="mail" required
          className={classes.textField} value={sendData.email} onChange={handleChange}
        />
        <TextField
          name="name" label="お名前" type="text" required
          className={classes.textField} value={sendData.name} onChange={handleChange}
        /> */}
        <TextField name="contents" label="Contents" required
          multiline
          rows="8" margin="normal" variant="outlined"
          className={classes.textField} value={sendData.contents} onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit"
          className={classes.textField} onClick={handleSubmit}
          style={{
            marginBottom:'20px',
          }}
        >
          送信
        </Button>

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

          {/* <Snackbar open={snackbarOpen}
            // autoHideDuration={6000}
            onClose={handleSnackBarClose}
            style={{
              position: 'fixed',
            marginBottom: '60px',
            width: '300px',
            height:'30px'
            }}
          >
          <Alert onClose={handleSnackBarClose} severity={snackbarInfo.severity}>
            {snackbarInfo.message}
          </Alert>
        </Snackbar> */}

      </Container>
    </main>
  );
}