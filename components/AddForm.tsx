import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MenuItem from "@material-ui/core/MenuItem";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { fireStoreDB, firebaseUser } from "../src/firebase";
import "firebase/functions";
import Geocode from "react-geocode";
import DrawerCloseButton from "./Button/DrawerCloseButton";
import { commonCss } from "./css/css";

const useStyles = makeStyles((theme) => ({
  textField: {
    display: "flex",
    width: "80%",
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  main: {
    position: "relative",
  },
}));

export default function AddForm(props) {
  const classes = useStyles();
  const commonClasses = commonCss();
  const [sendData, setSendData] = useState({
    place: "",
    title: "",
    subTitle: "",
    link: "",
    like: "",
    startDate: "",
    endDate: "",
    genre: "",
    email: "",
    name: "",
    contents: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarInfo, setSnackBarInfo] = useState({
    severity: "",
    message: "",
  });

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  Geocode.setApiKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`);

  //  Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Geocode.fromAddress(sendData.place).then(
      (response) => {
        const { lat, lng }: { lat: number; lng: number } =
          response.results[0].geometry.location;
        fireStoreDB
          .collection("createEvent")
          .add({
            postUid: firebaseUser().uid,
            id: Math.random() * 100000,
            contents: sendData.contents,
            link: sendData.link,
            like: "",
            endDate: sendData.endDate,
            longitudeLatitude: [lat, lng],
            period: `${sendData.startDate}～${sendData.endDate}`,
            tagList: sendData.genre,
            title: sendData.title,
            subTitle: sendData.subTitle,
            streetAddress: sendData.place,
            startDate: sendData.startDate,
            thumbnail: "https://via.placeholder.com/640x400",

            // thumbnail: sendData.thumbnail,
          })
          .then(() => {
            setSnackBarInfo({
              severity: "success",
              message: "投稿完了",
            });
            setSnackBarOpen(true);
            console.log("Successed send mail.");
            setTimeout(() => {
              setSnackBarOpen(false);
            }, 1000);
            setSendData({
              place: "",
              title: "",
              subTitle: "",
              link: "",
              like: "",
              startDate: "",
              endDate: "",
              genre: "",
              email: "",
              name: "",
              contents: "",
            });
            // setSendData({
            //   email: '', name: '', content: ''
            // });
          })
          .catch((err) => {
            setSnackBarInfo({
              severity: "error",
              message: "送信に失敗しました。時間をおいて再度お試しください。",
            });
            setSnackBarOpen(true);
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  //  Change TextField
  const handleChange = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };

  //  Close SnackBar
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <>
      <main className={classes.main}>
        <div
          className={commonClasses.drawerCloseButton}
          onClick={() => {
            props.setAddDrawerOpen(!props.addDrawerOpen);
          }}
        >
          <DrawerCloseButton />
        </div>
        <Container maxWidth="sm" className={classes.contactForm}>
          <Typography variant="h5" component="h1" gutterBottom>
            新規スポット投稿
          </Typography>
          <TextField
            name="place"
            label="住所か場所　福岡県福岡市、福岡タワー"
            type="text"
            required
            className={classes.textField}
            value={sendData.place}
            onChange={handleChange}
          />
          <TextField
            name="title"
            label="タイトル"
            type="text"
            required
            className={classes.textField}
            value={sendData.title}
            onChange={handleChange}
          />
          <TextField
            name="subTitle"
            label="サブタイトル"
            type="text"
            required
            className={classes.textField}
            value={sendData.subTitle}
            onChange={handleChange}
          />
          <TextField
            name="link"
            label="ホームページなどのURL"
            type="text"
            required
            className={classes.textField}
            value={sendData.link}
            onChange={handleChange}
          />
          <TextField
            name="startDate"
            label="開始日　2021/04/01"
            type="text"
            required
            className={classes.textField}
            value={sendData.startDate}
            onChange={handleChange}
          />
          <TextField
            name="endDate"
            label="終了日　2021/04/01"
            type="text"
            required
            className={classes.textField}
            value={sendData.endDate}
            onChange={handleChange}
          />
          <TextField
            name="genre"
            select
            label="カテゴリー"
            value={sendData.genre}
            className={classes.textField}
            onChange={handleChange}
            // helperText="Please select your currency"
            // variant="outlined"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="contents"
            label="内容"
            required
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            className={classes.textField}
            value={sendData.contents}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.textField}
            onClick={handleSubmit}
            style={{
              marginBottom: "20px",
            }}
          >
            送信
          </Button>

          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <Snackbar
            open={snackbarOpen}
            // autoHideDuration={6000}
            onClose={handleSnackBarClose}
            style={{
              position: "fixed",
              marginBottom: "60px",
              width: "300px",
              height: "30px",
            }}
          >
            <Alert>
              {/* <Alert onClose={handleSnackBarClose} severity={snackbarInfo.severity}> */}
              {snackbarInfo.message}
            </Alert>
          </Snackbar>
        </Container>
      </main>
    </>
  );
}
