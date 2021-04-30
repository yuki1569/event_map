import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState,useEffect,ReactElement, } from "react";
import {  auth, fireStoreDB, firebaseUser } from '../src/firebase';


export default function SwitchCom(props) {
  const [checked, setChecked] = useState(false);
  

const lists =  props.userList.map((list) => {
    let userTaglist = [];
    if (list.uid === firebaseUser().uid) {
      userTaglist.push(list)
  }
  return userTaglist
  })
  
  console.log(lists)

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

 
  useEffect(() => {
    
    if (checked) {
      console.log(checked)
      fireStoreDB.collection('users').doc(firebaseUser().uid).set({
        uid: firebaseUser().uid,
        tag: [props.tag,]
        
      })
    } else{
      console.log(checked)
      
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