import { createStyles, makeStyles } from "@material-ui/core/styles";

export const commonCss = makeStyles((theme) =>
  createStyles({
    buttonTop: {
      position: "fixed",
      zIndex: 20,
      right: "10px",
      bottom: "19vh",
      [theme.breakpoints.up("sm")]: {
        bottom: "12vh",
      },
    },
    buttonBottom: {
      position: "fixed",
      zIndex: 10,
      right: "10px",
      bottom: "8vh",
      [theme.breakpoints.up("sm")]: {
        bottom: "1vh",
      },
    },
    drawerCloseButton: {
      position: "fixed",
      zIndex: 80,
      right: "1%",
      bottom: "1%",
      [theme.breakpoints.up("sm")]: {
        bottom: "1vh",
      },
    },
  })
);
