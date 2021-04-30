import { Login,GithubLogin,fireStoreDB, Logout, auth,firebaseUser } from "../../src/firebase";
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
import SwitchCom from '../../components/SwithPageLogin'



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
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center',
    height: '100vh',
    backgroundColor:''
  },

  paper: {
    // marginTop: theme.spacing(10),
    // display: 'flex',
    // zIndex:11,
    // alignItems: 'center',
    
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

export default function SignIn(props) {
  // console.log(props.userList)
  const classes = useStyles();
  const [modalHidden, setmodallHidden] = useState(true)

  return (
    <div className={classes.center}>
      <NavBar/>
      <BottomMenuBar modalHidden={modalHidden} setmodallHidden={setmodallHidden} />
      
      {auth.currentUser
        ? <div style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
        className={classes.center}
        >
          <h2>{firebaseUser().email}でログイン中です</h2>
            <p>プロフィールを更新</p>
            <p>メールアドレスの登録・変更</p>
            <p>お住まいの地域</p>
            <p>誰と出かけるか</p>
            
          <SwitchCom name={'一人で'} tag={['個人で','美術展・博物展','見本市・展示会','伝統・歴史体験']} userList={props.userList}/>
          <SwitchCom name={'友達と'} tag={['友達と','友人と','花・自然','体験イベント・アクティビティ','美術展・博物展','味覚狩り','見本市・展示会','伝統・歴史体験','イルミネーション','ライトアップ','グルメ・フードフェス']} userList={props.userList}/>
          <SwitchCom name={'恋人と・夫婦で'} tag={['花・自然','恋人と・夫婦で','恋人・夫婦で','友達と','友人と','体験イベント・アクティビティ','友達と','友人と','体験イベント・アクティビティ','味覚狩り','見本市・展示会','伝統・歴史体験','イルミネーション','ライトアップ','グルメ・フードフェス']} userList={props.userList}/>
          <SwitchCom name={'幼児以下の子供と'} tag={['幼児と','幼児と']} userList={props.userList}/>
          <SwitchCom name={'小学生までの子供と'} tag={['花・自然','子供と','幼児と','小学生と','体験イベント・アクティビティ','味覚狩り','イルミネーション','ライトアップ','グルメ・フードフェス']} userList={props.userList}/>
          <SwitchCom name={'中学生以上の子供と'} tag={['中・高校生と','友達と','友人と','体験イベント・アクティビティ','味覚狩り','見本市・展示会','伝統・歴史体験','イルミネーション','ライトアップ','グルメ・フードフェス']} userList={props.userList}/>

          < Button
            onClick={() => Logout()}
            style={{marginBottom:'50px'}}
          >
          <span style={{ fontSize: 16 }}>
              ログアウト
          </span></Button>
          
        </div>

        :
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
            className={classes.center}
          >
            <div style={{
              maxWidth: '700px',
            }}>

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
          
              <p>ログインするとできること</p>
              <p>・ブックマーク機能の利用</p>
              <p>・スポット投稿機能の利用</p>
              <p>・おすすめ機能の利用</p>
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

export async function getServerSideProps() {

  // const fireStoredbEventList = await fireStoreDB.collection('eventList').get();
  // await fireStoredbEventList.docs.map((doc) => {
  //     eventList.push(doc.data())
  // });

  const userList = []
  const fireStoredbCreateEvent = await fireStoreDB.collection('users').get();
  await fireStoredbCreateEvent.docs.map((doc) => {
        userList.push(doc.data())
  });
    
    return {
      props: {
        userList
        
      },
    }

}
