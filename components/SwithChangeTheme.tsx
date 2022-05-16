import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState, useEffect, ReactElement } from "react";
import { auth, fireStoreDB, firebaseUser, Firebase } from "../src/firebase";
import { DarkMode, ThemeSet } from "../pages/_app";
import { darkTheme, lightTheme } from "./theme";

export default function SwithChangeTheme(props) {
  const { darkMode, setDarkMode } = useContext(DarkMode);
  const { theme, setTheme } = useContext(ThemeSet);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (theme === lightTheme) {
      setChecked(false);
    } else if (theme === darkTheme) {
      setChecked(true);
    }
  }, [theme]);

  // const userTagList = props.userTagList

  const toggleChecked = () => {
    // setChecked((prev) => !prev);
    if (theme === lightTheme) {
      setTheme(darkTheme);
      localStorage.setItem("darkMode", "on");
      setDarkMode(true);
    } else if (theme === darkTheme) {
      setTheme(lightTheme);
      localStorage.setItem("darkMode", "off");
      setDarkMode(false);
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="ダークモード"
      />
    </FormGroup>
  );
}
