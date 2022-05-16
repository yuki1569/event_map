import PropTypes from "prop-types";
import Head from "next/head";
import React, { useReducer, useEffect, useState } from "react";
import { AppProps } from "next/app";
import AuthContext from "../src/AuthContext";
import authReducer from "../src/authReducer";
import { listenAuthState } from "../src/firebase";

import CssBaseline from "@material-ui/core/CssBaseline";
// カスタムしたテーマ(スタイル)を定義
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "../components/theme";

export const DarkMode = React.createContext(
  {} as {
    darkMode;
    setDarkMode;
  }
);
export const ThemeSet = React.createContext(
  {} as {
    theme;
    setTheme;
  }
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  );
  useEffect(() => {
    return listenAuthState(dispatch);
  }, []);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // テーマ化カラー切替
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const [theme, setTheme] = React.useState(lightTheme);

  const valueDarkMord = {
    darkMode,
    setDarkMode,
  };

  const valueTheme = {
    theme,
    setTheme,
  };

  React.useEffect(() => {
    if (localStorage.getItem("darkMode") === "on") {
      setDarkMode(true);
      setTheme(darkTheme);
    } else if (localStorage.getItem("darkMode") === "off") {
      setDarkMode(false);
      setTheme(lightTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      setTheme(darkTheme);
    } else {
      setDarkMode(false);
      setTheme(lightTheme);
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head> */}

      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <AuthContext.Provider value={state}>
          <DarkMode.Provider value={valueDarkMord}>
            <ThemeSet.Provider value={valueTheme}>
              <Component {...pageProps} />
            </ThemeSet.Provider>
          </DarkMode.Provider>
        </AuthContext.Provider>
        <CssBaseline />
      </MuiThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
