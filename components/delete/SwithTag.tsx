import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState, useEffect, ReactElement } from "react";
import { auth, fireStoreDB, firebaseUser } from "../../src/firebase";

export default function SwitchTag(props) {
  let lists = props.userTagList;

  // const [checked, setChecked] = useState(props.checked);

  // if (lists.filter((list) => list.tag === props.tag) > 0) {
  //   setChecked(true);
  // }

  // lists.filter;

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     if (props.checked) {
  //       fireStoreDB
  //         .collection("users")
  //         .doc(firebaseUser().uid + props.tag)
  //         .set({
  //           tag: props.tag,
  //           uid: firebaseUser().uid,
  //           uidname: firebaseUser().uid + props.name,
  //         });
  //     } else if (props.checked == false) {
  //       fireStoreDB
  //         .collection("users")
  //         .doc(firebaseUser().uid + props.tag)
  //         .delete();
  //     } else {
  //     }
  //   }
  // }, [props.checked]);

  return <FormGroup>maru</FormGroup>;
}
