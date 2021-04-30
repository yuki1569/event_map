import { Login,GithubLogin, Logout, auth,firebaseUser } from "../../src/firebase";
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons';
import BottomMenuBar from '../../components/BottomMenuBar'
import NavBar from '../../components/NavBar'


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
    top:'8vh',
    zIndex: 50,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center',
    height: '86vh',
    backgroundColor:'rgba(10,0,0,0.3)'
  },

  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    zIndex:11,
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
  const [modalHidden, setmodallHidden] = useState(true)

  return (
    <div className={classes.center}>
      {/* <CssBaseline /> */}
      <NavBar/>
      <BottomMenuBar modalHidden={modalHidden} setmodallHidden={setmodallHidden}/>
      {auth.currentUser
        ? <div style={{backgroundColor:'white',width:'100%',position:'fixed',bottom:'7vh'}}>
          <h2>{firebaseUser().email}でログイン中です</h2>
          < Button
            onClick={() => Logout()}
            style={{marginBottom:'50px'}}
          >
          <span style={{ fontSize: 16 }}>
              ログアウト
          </span></Button>
          <ul>
            <li>プロフィールを更新</li>
            <li>メールアドレスの登録・変更</li>
            <li>お住まいの地域</li>
            <li>設定・規約・よくある質問</li>
            <li></li>
          </ul>
        </div>
        : <>
          <div  style={{display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',marginBottom:'20px'}} className={classes.center}>
            <div style={{
              maxWidth: '700px',
            }}>
            {/* <div className={classes.paper}> */}
            <Avatar
              className={classes.avatar}
              style={{ backgroundColor: '#19857b',margin:'0 auto' }}
            >
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
            style={{ height: '45px', width: '90%', maxWidth:'600px',margin: '10px', }}
          >
            <span style={{ fontSize: 16 }}>
              Googleでログイン
              {/* {this.props.formText} */}
            </span>
          </Button>

          <a
            onClick={() => GithubLogin()}
          >
          <TwitterLoginButton
            // onClick={this.twitterLogin}
            align="center" iconSize={'20'}
            style={{display:'inline-block', height: '45px', width: '90%', maxWidth:'600px',margin: '10px', }}
            >
            <span style={{ fontSize: 16 }}>Twitterでログイン
            {/* {this.props.formText} */}
            </span>
          </TwitterLoginButton>
          </a>
          
              {/* <ds
              </form>
              
          {/* <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            style={{width:'90%',maxWidth:'600px',backgroundColor:'white',borderRadius:'3px'}}
            
          /> */}
          {/* <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{width:'90%',maxWidth:'600px',backgroundColor:'white',borderRadius:'3px'}}
          /> */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{width:'90%',maxWidth:'600px',borderRadius:'3px'}}
          >
            Sign In
          </Button> */}
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
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </>
        }
          {/* </Container> */}
          
      </div>
  );
}
