import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SwithChangeTheme from "./SwithChangeTheme";

const drawerWidth = 180;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: theme.palette.primary.main,
      height: '10vh',
      zIndex: 10
    },
    drawer: {
      [theme.breakpoints.up("xl")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolBar: {
      // height: "9vh",
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
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }

const MENU_LIST = [
  {
    title: "Home",
    // icon: <InboxIcon />,
    href: "/",
  },
  {
    title: "使い方",
    // icon: <InboxIcon />,
    href: "/csr",
  },
  {
    title: "設定・規約",
    // icon: <InboxIcon />,
    href: "/csr/a",
  },
  {
    title: "よくある質問",
    // icon: <InboxIcon />,
    href: "/isg",
  },
];
const pages = [
  {
    title: "Home",
    // icon: <InboxIcon />,
    href: "/",
  },
  {
    title: "使い方",
    // icon: <InboxIcon />,
    href: "/csr",
  },
  {
    title: "設定・規約",
    // icon: <InboxIcon />,
    href: "/csr/a",
  },
  {
    title: "よくある質問",
    // icon: <InboxIcon />,
    href: "/isg",
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavBar(props) {
  const { window } = props;
  const classes = useStyles(props);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const drawer = (
  //   <div>
  //     <div className={classes.toolbar} />
  //     <Divider />
  //     <List>
  //       {MENU_LIST.map(({ title, href }, index) => (
  //         <div key={index}>
  //         <ListItem
  //           button
  //           key={title}
  //           onClick={() => {
  //             setMobileOpen(false);
  //             router.push(href);
  //           }}
  //         >
  //           <ListItemText primary={title} />
  //         </ListItem>
  //         </div>
  //       ))}
  //     </List>

  //   </div>
  // );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    {/* <div className={classes.root}> */}
      {/* <CssBaseline /> */}
      {/* <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav> */}

      {/* モバイル以下なら隠す -- モバイル画面以外で表示 */}
      {/* <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden> */}

      {/* <AppBar >
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Event Map
          </Typography>
        </Toolbar>
      </AppBar> */}

      <Toolbar className={classes.root}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        ></Typography>

        <Box sx={{minHeight: "none", flexGrow: 1, display:  { xs: "flex", sm: "none" }, position:"right" }}>
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                <Typography>{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 2, display: { xs: "none", sm: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.title}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "flex" }}
            >
              {page.title}
            </Button>
          ))}
        </Box>

        <Box
          component="div"
          sx={{justifyContent: 'flex-end' , flexGrow: 1, display: { xs: "none", sm: "flex" } 
          }}
          className="serchBox"
        >
          <SwithChangeTheme/>
          <div
            onClick={() => {
              props.setmodalEventListHidden(!props.modalEventListHidden)
            }}
          >
          <Button
              sx={{ my: 2, color: "white", display: "flex" }}
              >
            検索
          </Button>
          </div>
          <div
            onClick={() => {
              props.setModalLoginOpen(!props.modalLoginOpen)
            }}
          >
          <Button
              sx={{ my: 2, color: "white", display: "flex" }}
              >
            my設定
            </Button>
            </div>
        </Box>
      </Toolbar>
      {/* </div> */}
      </>
  );
}
