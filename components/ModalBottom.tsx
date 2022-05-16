import {
  Box,
  createStyles,
  createTheme,
  makeStyles,
  MuiThemeProvider,
  Theme,
  Typography,
} from "@material-ui/core";
import Modal from "react-modal";
import ModalCloseButton from "./Button/ModalCloseButton";
import { lightTheme, darkTheme, theme } from "../components/theme";
import Grid from "@material-ui/core/Grid";
import { useContext } from "react";
import { ThemeSet } from "../pages/_app";

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#__next");

export default function ModalBottom({ ...props }) {
  const { theme, setTheme } = useContext(ThemeSet);
  const themeColor = () => {
    if (theme === lightTheme) {
      return lightTheme.palette.primary;
    } else {
      return darkTheme.palette.text.primary;
    }
  };
  const themeGrid = createTheme({
    overrides: {
      MuiGrid: {
        container: {
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
          },
          color: themeColor,
        },
      },
    },
  });
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      overlay: {
        zIndex: 20,
        height: "50vh",
        [theme.breakpoints.down("xs")]: {
          bottom: "9vh",
        },
      },
      closeButton: {
        position: "fixed",
        zIndex: 80,
        right: "1vh",
        bottom: "2vh",
        [theme.breakpoints.down("xs")]: {
          bottom: "9vh",
        },
      },
    })
  );
  const classes = useStyles();

  return (
    <>
      <div className={classes.overlay}>
        {/* イベントリストモーダルを閉じるボタン */}
        <div
          className={classes.closeButton}
          onClick={() => {
            props.setIsOpenBottom(false);
            props.changeMarker("");
            props.setmapHeight("100%");
          }}
        >
          <ModalCloseButton />
        </div>

        <MuiThemeProvider theme={themeGrid}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={`${
                    props.img
                      ? props.img
                      : "https://via.placeholder.com/640x400"
                  }`}
                  style={{ width: "80%" }}
                />
              </div>
            </Grid>
            <Grid item md={8}>
              <a target="_blank" href={props.link}>
                サイトへ
              </a>
              <Typography variant="body1" gutterBottom>
                {props.period}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {props.streetAdress}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {props.tagList}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {props.contents}
              </Typography>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    </>
  );
}
