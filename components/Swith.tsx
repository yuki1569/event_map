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

  //配列のpush用関数同じ値があったらtrueを返す
  function IsArrayExists(array, value) {
  // 配列の最後までループ
  for (var i =0, len = array.length; i < len; i++) {
    if (value == array[i]) {
      // 存在したらtrueを返す
      return true;
    }
  }
  // 存在しない場合falseを返す
  return false;
}

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
    } else{
      console.log(checked)
      const EventList = props.initialEventList
      console.log(EventList)
      props.setOnRecommendValue(EventList)
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