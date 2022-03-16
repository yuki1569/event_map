import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState, useEffect, ReactElement } from "react";
import { auth, fireStoreDB, firebaseUser, Firebase } from "../src/firebase";

export default function SwitchCom(props) {
  let initFirebaseAuth = () => {
    return new Promise((resolve) => {
      var unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      });
    });
  };

  const checked = props.switchRecom;
  const setChecked = props.setSwitchRecom;

  // const [checked, setChecked] = useState(false);
  const [uid, setUid] = useState("id");
  const userTagList = [];
  const tagList = [];
  let lists = props.initialEventList;

  async function checkRecom() {
    var user = await initFirebaseAuth();
    if (user) {
      console.log(user); // ユーザー情報が表示される
    }
    // 以降であれば currentUser にアクセスしても OK
    if (Firebase.auth().currentUser) {
      await setUid(Firebase.auth().currentUser.uid);
      console.log(uid);
      const fireStoredbUserTagList = await fireStoreDB
        .collection("users")
        .get();
      await fireStoredbUserTagList.docs.map((doc) => {
        userTagList.push(doc.data());
      });
      console.log(userTagList);
      await userTagList.map((tag) => {
        if (tag.uid === uid) {
          tagList.push(tag.tag);
        } else if (uid === null) {
          return;
        }
      });
      console.log(tagList);

      await test();

      await props.setOnRecommendValue(lists);
      await props.setEventList(lists);
      await props.setEventListMarker(lists);
    }
  }
  useEffect(() => {
    checkRecom();
  }, [checked]);

  function test() {
    console.log("test()実行");
    if (checked) {
      if (tagList.length != 0) {
        const EventList = props.initialEventList;
        const length: number = props.initialEventList.length;
        lists = [];
        let tag = [];
        for (let I = 0; I < tagList.length; I++) {
          for (let i = 0; i < tagList[I].length; i++) {
            tag.push(tagList[I][i]);
          }
        }
        console.log(tag);

        for (let i = 0; i < length; i++) {
          const array = tag;
          let list = EventList[i];
          let countTrue = 0;
          array.map((a) => {
            if (list.tagList.includes(a)) {
              countTrue++;
            }
          });
          if (countTrue != 0) {
            lists.push(list);
          } else {
          }
        }
      } else {
        alert(
          "設定されてません。マイページで”誰と出かけるか”の項目を設定して下さい"
        );
        setChecked(false);
      }
    } else {
    }
  }

  // const userTagList = props.userTagList

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    props.setfavoritehide(true);
  };

  // useEffect(() => {
  //   if (checked) {
  //     if (tagList.length != 0) {
  //       const EventList = props.initialEventList;
  //       let lists = [];

  //       const length: number = props.initialEventList.length;

  //       for (let i = 0; i < length; i++) {
  //         const array = tagList[0];

  //         let list = EventList[i];
  //         let countTrue = 0;

  //         array.map((a) => {
  //           if (list.tagList.includes(a)) {
  //             countTrue++;
  //           }
  //         });

  //         if (countTrue != 0) {
  //           lists.push(list);
  //         } else {
  //         }
  //       }
  //       props.setOnRecommendValue(lists);
  //       props.setEventList(lists);
  //       props.setEventListMarker(lists);
  //     } else {
  //       alert(
  //         "設定されてません。マイページで”誰と出かけるか”の項目を設定して下さい"
  //       );
  //       setChecked(false);
  //     }
  //   } else {
  //     props.setOnRecommendValue(props.initialEventList);
  //     props.setEventListMarker(props.initialEventList);
  //     props.setEventList(props.initialEventList);
  //   }
  // }, [checked]);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="おすすめ"
      />
    </FormGroup>
  );
}
