import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState,useEffect,ReactElement, } from "react";
import {  auth, fireStoreDB, firebaseUser } from '../src/firebase';



export default function SwitchCom(props) {
  let lists = props.userList

  // console.log(lists.filter(list => list.tag === props.tag))

  function test() {
    // if (lists.filter(list => list.tag === props.tag).length != 0) {

      if ((lists.filter(list => list.uidname === firebaseUser().uid+props.name).length != 0)) {
        console.log('storeにあります')
        return true
        
      }
     else {
      console.log('storeにありません')
      return  false
  }
  }
  let bool = test()


  const [checked, setChecked] = useState(bool);

  

  // console.log(lists.filter(list => list.tag === props.tag))

  if (lists.filter(list => list.tag === props.tag) > 0) {
    setChecked(true)
  }

  
  lists.filter
  console.log(lists)

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

 
  useEffect(() => {
    if (checked) {
      console.log(checked)
      fireStoreDB.collection('users').doc(firebaseUser().uid + props.tag).set({
        tag : props.tag,
        uid :firebaseUser().uid,
        uidname :firebaseUser().uid+props.name
      })
    } else{
      console.log(checked)
      fireStoreDB.collection('users').doc(firebaseUser().uid + props.tag).delete()
    }
  },[checked])

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={toggleChecked} />
        }
        label={props.name}
      />
    </FormGroup>
  );
}