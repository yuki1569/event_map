import {
  createStyles,
  createTheme,
  makeStyles,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core";
import Modal from "react-modal";
import ModalCloseButton from "./Button/ModalCloseButton";
import theme from "./theme";
import { commonCss } from "./css/css";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: "fixed",
      zIndex: 80,
      right: "1vh",
      bottom: "2vh",
      // [theme.breakpoints.down("xs")]: {
      //   bottom: "9vh",
      // },
    },
  })
);
const useStylesModal = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      // backgroundColor: "white",
      // position: "fixed",
      // left: 0,
      // top: "60%",
      zIndex: 20,
      height: "50vh",
      // overflow: "auto",
      [theme.breakpoints.down("xs")]: {
        bottom: "9vh",
      },
    },
    content: {
      // backgroundColor: "#ffffff",
      color: "rgba(0, 0, 0, 0.87)",
      border: "hidden",
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      top: "0px",
      left: "0",
      right: "auto",
      bottom: "auto",
      marginRight: "-20%",
      width: "100%",
      height: "100%",
    },
    text: {
      color: "rgba(0, 0, 0, 0.87)",
    },
  })
);
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
      },
    },
  },
});
// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#__next");

export default function ModalBottom({ ...props }) {
  const classes = useStyles();
  const classesModal = useStylesModal();
  const commonClasses = commonCss();
  const customStyles = {
    overlay: {
      position: "fixed",
      left: 0,
      top: "60%",
      zIndex: 20,
      [theme.breakpoints.down("xs")]: {
        bottom: "9vh",
      },
    },
    content: {
      backgroundColor: "#ffffff",
      color: "rgba(0, 0, 0, 0.87)",
      border: "hidden",
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      top: "0px",
      left: "0",
      right: "auto",
      bottom: "auto",
      marginRight: "-20%",
      width: "100%",
      height: "100%",
    },
    text: {
      color: "rgba(0, 0, 0, 0.87)",
    },
  };

  return (
    <>
      <div className={classesModal.overlay}>
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
        <div className={classesModal.content}>
          <div className={classesModal.text}>
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
                  <li>
                    <a target="_blank" href={props.link}>
                      サイトへ
                    </a>
                  </li>
                  <li>{props.period}</li>
                  <li>{props.streetAdress}</li>
                  <li>{props.tagList}</li>
                  <li>{props.contents}</li>
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
