import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  createStyles,
  useTheme,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Hidden } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import MapIcon from "@material-ui/icons/Map";
import AddButtons from "./Button/AddButton";
import Drawer from "@material-ui/core/Drawer";
import AddForm from "./AddForm";
import DrawerCloseButton from "./Button/DrawerCloseButton";
import { Login, Logout, auth, firebaseUser } from "../src/firebase";
import { commonCss } from "./css/css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
    },
    root: {
      display: "flex",
    },
    toolBar: {
      height: "9vh",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      [theme.breakpoints.up("sm")]: {
        width: 500,
        flexShrink: 0,
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        flexShrink: 0,
      },
    },
    content: {
      // flexGrow: 1,
      padding: theme.spacing(2),
    },
  })
);

export default function BottomMenuBar(props, modalEventListHidden) {
  const classes = useStyles();
  const commonClasses = commonCss();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      {auth.currentUser ? (
        <div
          className={commonClasses.buttonBottom}
          onClick={() => {
            setAddDrawerOpen(!addDrawerOpen);
          }}
        >
          <AddButtons />
        </div>
      ) : (
        <></>
      )}

      <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "left" : "right"}
        open={addDrawerOpen}
        // onClose={handleDrawerToggle}
        // open={mobileOpen}
        // onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <AddForm
          setAddDrawerOpen={setAddDrawerOpen}
          addDrawerOpen={addDrawerOpen}
        />
      </Drawer>

      <Hidden smUp implementation="css">
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "85%",
              height: "7vh",
              margin: "0 auto",
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => {
                router.push("/");
                props.setmodalEventListHidden(true);
              }}
            >
              <MapIcon />
            </IconButton>

            <IconButton
              color="inherit"
              // className={classes.icon}
              onClick={() => {
                router.push("/");
                props.setmodalEventListHidden(!modalEventListHidden);
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
              // className={classes.icon}
              onClick={() => {
                // router.push("/csr/login");
                // props.setmodalEventListHidden(true);

                props.setModalLoginOpen(!props.modalLoginOpen);
              }}
            >
              <PersonIcon fontSize={"default"} />
            </IconButton>
          </div>
        </AppBar>
      </Hidden>
    </>
  );
}
