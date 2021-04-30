import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState,useEffect,ReactElement, } from "react";

export default function SwitchCom(props) {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

 
  useEffect(() => {
    
    if (checked) {
      const EventList = props.initialEventList
      console.log(checked)
      let lists = []
      
      const length: number = props.initialEventList.length
      
      for (let i = 0; i < length; i++) {
        const array = ['幼児と']

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