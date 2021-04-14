// import Layout from "../components/Layout";
import { Login, Logout, auth } from "../../src/firebase";
import { dataBase } from '../../lib/db';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    width:'100%',
    position: 'fixed',
    top:'11vh',
    zIndex: 9,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center',
    height: '82vh',
    backgroundColor:'rgba(10,0,0,0.3)'
  },

  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    zIndex:9,
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.center}>
    {/* <Container
      // component="main"
      maxWidth="xs"
    > */}
      <CssBaseline />
      
      {auth.currentUser
        ? <div className={classes.paper}>
          <h3>ログイン中です</h3>
          {/* {
        dataBase.map((value, index) =>
          <div key={index}>
            <li style={{ color: 'white' }} >{value.title}</li>
            <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
          </div>
        )
      } */}
          < Button
            onClick={() => Logout()}
            style={{marginBottom:'50px'}}
       >
          <span style={{ fontSize: 16 }}>
                 ログアウト
               </span></Button>
        </div>
        : <>
            <div className={classes.center}>
            {/* <div className={classes.paper}> */}
        <Avatar style={{backgroundColor:'#19857b'}} className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          
          <Button
            onClick={() => Login()}
            variant="contained"
            color= 'secondary'
            
            disableElevation
            // align="center" iconSize={'20'}
            style={{ height: '45px', width: '90%', margin: '10px', }}
          >
            <span style={{ fontSize: 16 }}>
              Googleでログイン
              {/* {this.props.formText} */}
            </span>
          </Button>

          <TwitterLoginButton
            // onClick={this.twitterLogin}
            align="center" iconSize={'20'}
            style={{display:'inline-block', height: '45px', width: '90%', margin: '10px', }}
          >
            <span style={{ fontSize: 16 }}>Twitterでログイン
            {/* {this.props.formText} */}
            </span>
        </TwitterLoginButton>
          
              <div style={{ textAlign: 'center', marginTop: 20 ,color:'white'}}>または</div>


        <form style={{ textAlign: 'center' }} noValidate autoComplete="off"></form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            style={{width:'90%',backgroundColor:'white',borderRadius:'3px'}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{width:'90%',backgroundColor:'white',borderRadius:'3px'}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{width:'90%',borderRadius:'3px'}}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </>
        }
      {/* </Container> */}
      </div>
  );
}


// const Test = () => (
//   // <Layout title="Home | Next.js + TypeScript Example">
//   <>
//     <h1>Hello Next.js 👋</h1>
//     <div>
//       <button onClick={() => Login()}>ログイン</button>
//       <button onClick={() => Logout()}>ログアウト</button>
//     </div>
//     <div>
//       <pre>
//         {auth.currentUser
//           ? dataBase.map((value, index) =>
//               <div key={index}>
//               <li style={{color:'white'}} >{value.title}</li>
//               <img src={value.thumbnail} style={{ width:'100%', maxWidth:'450px'}}/>
//               </div>
//               )
//           : ''
//         }
//         {/* {auth.currentUser
//           ? auth.currentUser.displayName + "でログインしています"
//           : "ログインしていません"} */}
//       </pre>
//     </div>
//   </>
//   // </Layout>
// );

// export default Test;