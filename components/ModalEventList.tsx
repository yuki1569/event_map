import Modal from "react-modal";
import ModalEventListDetails from "./ModalEventListDetails";
import { useState, useEffect, ReactElement, Suspense } from "react";
import { auth, fireStoreDB, firebaseUser, Firebase } from "../src/firebase";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModalCloseButton from "./Button/ModalCloseButton";
import SearchTextField from "./SearchTextField";
import ToggleButtons from "../components/Button/ToggleButoon";
import SwitchCom from "./SwithCom";
import Grid from "@material-ui/core/Grid";
import EventListItem from "./ModalEventListItem";
import { Collections } from "@material-ui/icons";
import firebase from "firebase";
import { commonCss } from "./css/css";
import {
  createStyles,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: "fixed",
      zIndex: 80,
      right: "1vh",
      bottom: "2vh",
    },
  })
);

export default function ModalEventList(props) {
  const classes = useStyles();
  function toggle(bool) {
    if (bool) {
      return "none";
    } else {
      return "";
    }
  }

  const initialEventList = props.EventList;
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [modalEventList, setModalEventList] = useState(initialEventList);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 34.673542,
    lng: 135.433338,
  });
  const [img, setImg] = useState("");
  const [contents, setContents] = useState("");
  const [favoritehide, setfavoritehide] = useState(true);

  const [listUpDate, setListUpDate] = useState(true);
  const [bookMark, setBookMark] = useState([]);

  const [likeUpDate, setlikeUpDate] = useState(true);

  const [switchSort, setSwitchSort] = useState("");

  const [onRecommendValue, setOnRecommendValue] = useState([]);

  useEffect(() => {
    setOnRecommendValue(onRecommendValue);
    setModalEventList(onRecommendValue);
  }, [onRecommendValue]);

  useEffect(() => {
    const searchBookMark = async () => {
      const res1 = await fireStoreDB.collection("eventList").get();
      const res2 = await fireStoreDB.collection("createEvent").get();

      if (res1.empty) return [];
      const BookMarkList = [];
      const key = [];

      await res1.docs.map((doc, index) => {
        BookMarkList.push(doc.data());
        key.push(index);
      });
      await res2.docs.map((doc, index) => {
        BookMarkList.push(doc.data());
        key.push(index);
      });

      setBookMark(BookMarkList);
    };
    searchBookMark();
  }, [listUpDate]);

  useEffect(() => {
    const searchEventList = async () => {
      let EventList = [];
      const res1 = await fireStoreDB.collection("eventList").get();
      const res2 = await fireStoreDB.collection("createEvent").get();
      if (res1.empty) return [];

      const key = [];
      let i = 0;

      await res1.docs.map((doc, index) => {
        EventList.push(doc.data());
        EventList[i].docId = doc.id;
        i++;
        key.push(index);
        console.log(EventList);
      });
      await res2.docs.map((doc, index) => {
        EventList.push(doc.data());
        EventList[i].docId = doc.id;
        i++;
        key.push(index);
        console.log(EventList);
      });
      console.log("全てのリスト");
      console.dir(EventList);

      if (props.switchRecom) {
        let list = [];

        EventList.map((doc) => {
          props.EventList.map((doc2) => {
            if (doc.docId == doc2.docId) {
              list.push(doc);
            }
          });
        });
        EventList = list;
        console.log("おすすめのリスト");
        console.dir(EventList);
      }

      switch (switchSort) {
        case "DateAscending":
          sortDateAscendingOrder(EventList);
          break;
        case "DateDescending":
          sortDateDescendingOrder(EventList);
          break;
        case "DistanceAscending":
          sortDistanceAscendingOrder(EventList);
          break;
        case "DistanceDescending":
          sortDistanceDescendingOrder(EventList);
          break;
        case "":
          break;
      }

      setModalEventList(EventList);
    };
    // searchEventList();

    setTimeout(searchEventList, 100);
  }, [likeUpDate]);

  useEffect(() => {
    setModalEventList(modalEventList);
  }, [modalEventList]);

  // 2点間座標のの距離を求める関数
  function distance(lat1, lng1, lat2, lng2) {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    return (
      Math.round(
        6371 *
          Math.acos(
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
              Math.sin(lat1) * Math.sin(lat2)
          ) *
          10
      ) / 10
    );
  }

  function sortDateAscendingOrder(modalEventList) {
    setSwitchSort("DateAscending");
    modalEventList.sort(function (a, b) {
      if (a.endDate > b.endDate) {
        return 1;
      } else if (a.endDate == b.endDate) {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    const db = [];
    modalEventList.map((event) => {
      db.push(event);
    });
    return db;
  }

  function sortDateDescendingOrder(modalEventList) {
    setSwitchSort("DateDescending");
    modalEventList.sort(function (a, b) {
      if (a.endDate < b.endDate) {
        return 1;
      } else if (a.endDate == b.endDate) {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    const db = [];
    modalEventList.map((event) => {
      db.push(event);
    });
    return db;
  }

  function sortDistanceAscendingOrder(modalEventList) {
    setSwitchSort("DistanceAscending");
    modalEventList.sort(function (a, b) {
      let A = distance(
        currentPosition.lat,
        currentPosition.lng,
        a.longitudeLatitude[0],
        a.longitudeLatitude[1]
      );
      let B = distance(
        currentPosition.lat,
        currentPosition.lng,
        b.longitudeLatitude[0],
        b.longitudeLatitude[1]
      );
      if (A > B) {
        return 1;
      } else if (A == B) {
        if (a.endDate > b.endDate) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    const db = [];
    modalEventList.map((event) => {
      db.push(event);
    });
    return db;
  }
  function sortDistanceDescendingOrder(modalEventList) {
    setSwitchSort("DistanceDescending");
    modalEventList.sort(function (a, b) {
      let A = distance(
        currentPosition.lat,
        currentPosition.lng,
        a.longitudeLatitude[0],
        a.longitudeLatitude[1]
      );
      let B = distance(
        currentPosition.lat,
        currentPosition.lng,
        b.longitudeLatitude[0],
        b.longitudeLatitude[1]
      );
      if (A < B) {
        return 1;
      } else if (A == B) {
        if (a.endDate > b.endDate) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    const db = [];
    modalEventList.map((event) => {
      db.push(event);
    });
    return db;
  }

  // 現在位置取得取得
  function getgeolocation() {
    const success = (data) => {
      const currentPosition = {
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      };
      setCurrentPosition(currentPosition);
    };
    const error = (data) => {
      const currentPosition = {
        lat: 34.673542,
        lng: 135.433338,
      };
    };
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success, error);
    }, []);
  }
  getgeolocation();

  const toggleChecked = () => {
    props.setSwitchFavorite((prev) => !prev);
    setfavoritehide(!favoritehide);
    setListUpDate(!listUpDate);
    props.setSwitchRecom(false);
  };

  return (
    <div>
      {/* リストごとの詳細画面用モーダル */}
      {/* <ModalEventListDetails
        modalIsOpenDetails={modalIsOpenDetails}
        setIsOpenDetails={setIsOpenDetails}
        img={img}
        contents={contents}
      /> */}

      {/* イベントリストモーダルを閉じるボタン */}
      <div
        className={classes.closeButton}
        onClick={() => {
          props.setmodalEventListHidden(true);
        }}
      >
        <ModalCloseButton />
      </div>

      {/* イベントリストモーダルの中身 */}
      {/* <Modal
        isOpen={true}
        // isOpen={modalIsOpenEventList}
        // onRequestClose={() => setIsOpenEventList(false)}
        style={customStyles}
      > */}
      <div style={{ marginTop: "0", display: "inline-block" }}>
        <SearchTextField
          initialEventList={initialEventList}
          modalEventList={modalEventList}
          setModalEventList={setModalEventList}
          // setSearchValue={setSearchValue}
          EventList={props.EventList}
          CreateEventList={props.CreateEventList}
          setEventListMarker={props.setEventListMarker}
        />
      </div>

      {/*おすすめのみ表示スイッチ */}
      <SwitchCom
        initialEventList={props.initialEventList}
        userTagList={props.userTagList}
        setOnRecommendValue={setOnRecommendValue}
        setModalEventList={setModalEventList}
        EventList={props.EventList}
        CreateEventList={props.CreateEventList}
        setEventListMarker={props.setEventListMarker}
        setEventList={props.setEventList}
        switchRecom={props.switchRecom}
        setSwitchRecom={props.setSwitchRecom}
        setfavoritehide={setfavoritehide}
        setSwitchFavorite={props.setSwitchFavorite}
      />
      {/* お気に入りのみスイッチ */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={props.switchFavorite} onChange={toggleChecked} />
          }
          label="お気に入り"
        />
      </FormGroup>

      <ToggleButtons
        sortDateAscendingOrder={() =>
          setModalEventList(sortDateAscendingOrder(modalEventList))
        }
        sortDateDescendingOrder={() =>
          setModalEventList(sortDateDescendingOrder(modalEventList))
        }
        sortDistanceAscendingOrder={() =>
          setModalEventList(sortDistanceAscendingOrder(modalEventList))
        }
        sortDistanceDescendingOrder={() =>
          setModalEventList(sortDistanceDescendingOrder(modalEventList))
        }
      />

      {/* お気に入りのみ表示 */}
      <div
        id="favoriteList"
        style={{ display: toggle(favoritehide), paddingTop: "20px" }}
      >
        {auth.currentUser ? (
          <Grid container spacing={2}>
            {bookMark.map((value, index) => {
              //ログイン中のユーザーがお気に入り登録をしているか
              if (value.like.includes(firebaseUser().uid)) {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <EventListItem
                      {...value}
                      key={index}
                      distance={distance(
                        currentPosition.lat,
                        currentPosition.lng,
                        value.longitudeLatitude[0],
                        value.longitudeLatitude[1]
                      )}
                      changeMapCenter={props.changeMapCenter}
                      setselectedButtonId={props.setselectedButtonId}
                    />
                  </Grid>
                );
              } else {
                return <></>;
              }
            })}
          </Grid>
        ) : (
          <></>
        )}
      </div>

      {/* イベントリスト全て表示 */}
      <div
        id="eventList"
        style={{ display: toggle(!favoritehide), paddingTop: "20px" }}
      >
        <Grid container spacing={2}>
          {modalEventList.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <EventListItem
                {...value}
                key={index}
                distance={distance(
                  currentPosition.lat,
                  currentPosition.lng,
                  value.longitudeLatitude[0],
                  value.longitudeLatitude[1]
                )}
                changeMapCenter={props.changeMapCenter}
                setselectedButtonId={props.setselectedButtonId}
              />

              {auth.currentUser ? (
                value.like.includes(firebaseUser().uid) ? (
                  <div
                    onClick={() => {
                      fireStoreDB
                        .collection(
                          `${
                            value.hasOwnProperty("postUid")
                              ? "createEvent"
                              : "eventList"
                          }`
                        )
                        .doc(value.docId)
                        .set(
                          {
                            like: firebase.firestore.FieldValue.arrayRemove(
                              firebaseUser().uid
                            ),
                          },
                          { merge: true }
                        );
                      setlikeUpDate(!likeUpDate);
                    }}
                  >
                    <Suspense fallback={<p>Loading...</p>}>
                      <IconButton color="secondary">
                        <FavoriteIcon />
                      </IconButton>
                    </Suspense>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      fireStoreDB
                        .collection(
                          `${
                            value.hasOwnProperty("postUid")
                              ? "createEvent"
                              : "eventList"
                          }`
                        )
                        .doc(value.docId)
                        .set(
                          {
                            like: firebase.firestore.FieldValue.arrayUnion(
                              firebaseUser().uid
                            ),
                          },
                          { merge: true }
                        );
                      setlikeUpDate(!likeUpDate);
                    }}
                  >
                    <Suspense fallback={<p>Loading...</p>}>
                      <IconButton color="inherit">
                        <FavoriteIcon />
                      </IconButton>
                    </Suspense>
                  </div>
                )
              ) : (
                <div></div>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
      {/* </Modal> */}
    </div>
  );
}
function initFirebaseAuth() {
  throw new Error("Function not implemented.");
}
