
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import NavBar from '../components/NavBar';
import BottomMenuBar from '../components/BottomMenuBar';
import Map from '../components/map/map';
import React, { useReducer, useEffect } from "react";
import { AppProps } from "next/app";
import AuthContext from "../src/AuthContext";
import authReducer from "../src/authReducer";
import { listenAuthState } from "../src/firebase";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  );
  useEffect(() => {
    return listenAuthState(dispatch);
  }, []);
   // const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>

      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
      {/* <ThemeProvider > */}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <AuthContext.Provider value={state}>
          
          <Component {...pageProps}/>
        <Map />

        </AuthContext.Provider>
        <CssBaseline />
      </ThemeProvider>

    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};