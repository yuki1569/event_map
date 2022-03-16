import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState, useEffect, ReactElement } from "react";
import { auth, fireStoreDB, firebaseUser } from "../src/firebase";

export default function SwitchCom(props) {
  let lists = props.userTagList;
  let initialChecked = props.initialChecked;

  const [checked, setChecked] = useState(initialChecked);

  if (lists.filter((list) => list.tag === props.tag) > 0) {
    setChecked(true);
  }

  lists.filter;

  const toggleChecked = () => {
    setChecked(!checked);
    props.setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      fireStoreDB
        .collection("users")
        .doc(firebaseUser().uid + props.tag)
        .set({
          tag: props.tag,
          uid: firebaseUser().uid,
          uidname: firebaseUser().uid + props.name,
        });
    } else {
      fireStoreDB
        .collection("users")
        .doc(firebaseUser().uid + props.tag)
        .delete();
    }
  }, [checked]);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label={props.name}
      />
    </FormGroup>
  );
}
