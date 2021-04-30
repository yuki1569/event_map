import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState, useEffect, ReactElement, } from "react";
import {  auth, fireStoreDB, firebaseUser } from '../src/firebase';

export default function SwitchCom(props) {
  // console.log(props.userTagList)
  const [checked, setChecked] = useState(false);
  const userTagList = props.userTagList

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  

  const tagList = []

  auth.currentUser
  ?userTagList.map(tag => {
      
      if (tag.uid === firebaseUser().uid) {
        tagList.push(tag.tag)
      } else if (firebaseUser().uid === null) {
        return
      }

  })
  :console.log(tagList)

 
  useEffect(() => {
    
    if (checked) {
      if (tagList.length != 0) {
        const EventList = props.initialEventList
        console.log(checked)
        let lists = []
      
        const length: number = props.initialEventList.length
      
        for (let i = 0; i < length; i++) {
          const array = tagList[0]

          let list = EventList[i]
          console.log(list.tagList)
          let countTrue = 0

          array.map(a => {
            if (list.tagList.includes(a)) {
              countTrue++
            }
          })
        
          if (countTrue != 0) {
            lists.push(list)
              
          } else {
            ;
          }
        }
        console.log(`イベント数は${lists.length}件です`)
        props.setOnRecommendValue(lists)
        props.setEventList(lists)
        props.setEventListMarker(lists)
      } else {
        alert('設定されてません。マイページで”誰と出かけるか”の項目を設定して下さい');
        setChecked(false)
      }
    } else{
      console.log(checked)
      // console.log(EventList)
      props.setOnRecommendValue(props.initialEventList)
      props.setEventListMarker(props.initialEventList)
      props.setEventList(props.initialEventList)
    }
  },[checked])

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={toggleChecked} />
        }
        label="おすすめ"
      />
    </FormGroup>
  );
}