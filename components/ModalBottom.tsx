import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import Modal from "react-modal";
import ModalCloseButton from "./Button/ModalCloseButton";
import theme from "./theme";
import { commonCss } from "./css/css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: "fixed",
      zIndex: 80,
      right: "1vh",
      bottom: "2vh",
      [theme.breakpoints.down("xs")]: {
        bottom: "8vh",
      },
    },
  })
);
// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#__next");

export default function ModalBottom({ ...props }) {
  const classes = useStyles();
  const commonClasses = commonCss();
  const customStyles = {
    overlay: {
      position: "fixed",
      left: 0,
      top: "60%",
      zIndex: 20,
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
      <Modal
        // isOpenがtrueならモダールが起動する※Modalのプロパティ
        isOpen={props.modalIsOpenBottom}
        // モーダルが開いた後の処理を定義
        // onAfterOpen={afterOpenModal}
        // モーダルを閉じる処理を定義
        onRequestClose={() => props.setIsOpenBottom(false)}
        // スタイリングを定義
        style={customStyles}
      >
        //modalBottom.tsx
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <div>
              <img src={props.img} style={{ maxWidth: "100%" }} />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <div className="text">
              <li>
                <a target="_blank" href={props.link}>
                  サイトへ
                </a>
              </li>
              <li>{props.period}</li>
              <li>{props.streetAdress}</li>
              <li>{props.tagList}</li>
              <li>{props.contents}</li>
            </div>
          </Grid>
        </Grid>
      </Modal>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 30% 60% 10%;
        }
      `}</style>
    </>
  );
}
