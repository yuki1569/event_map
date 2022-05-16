import React, { useState, useEffect, useContext } from "react";
import GoogleMapReact, {
  MapOptions,
  Maps,
  ChangeEventValue,
} from "google-map-react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CustumMarker from "../components/map/marker";
import PersonMarker from "../components/map/PersonMarker";
import ModalBottom from "../components/ModalBottom";
import MyLocationButton from "../components/Button/MyLocationButton";
import BottomMenuBar from "../components/BottomMenuBar";
import { fireStoreDB } from "../src/firebase";
import Geocode from "react-geocode";
import ModalLogin from "../components/ModalLogin";
import { commonCss } from "../components/css/css";
import { lightTheme, darkTheme } from "../components/theme";

import { createTheme, Drawer, MuiThemeProvider } from "@material-ui/core";

import ModalEventList from "../components/ModalEventList";
import NavBar from "../components/NavBar";
import { ThemeSet } from "./_app";

const APIKEY = "";
Geocode.setApiKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`);

const themeBottomWindow = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        top: "none",
      },
    },
    // MuiPaper: {
    //   root: {
    //     backgroundColor: theme.palette.background.paper,
    //   },
    // },
  },
});

export default function CreateMaps(props) {
  const commonClasses = commonCss();
  const createMapOptions = (maps: Maps): MapOptions => {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 29,
            },
            {
              weight: 0.2,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#dedede",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              saturation: 36,
            },
            {
              color: "#333333",
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#f2f2f2",
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 17,
            },
            {
              weight: 1.2,
            },
          ],
        },
      ],
    };
  };
  const [eventList, setEventList] = useState(props.EventList);
  const [userTagList, setUserTagList] = useState(props.userTagList);
  const [switchRecom, setSwitchRecom] = useState(false);
  const [switchFavorite, setSwitchFavorite] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = React.useState(false);
  const handleModalLoginopen = () => setModalLoginOpen(!modalLoginOpen);

  const [eventListMarker, setEventListMarker] = useState(props.EventList);
  const [center, setCenter] = useState({ lat: 34.665442, lng: 135.432338 });
  const [zoom, setZoom] = useState<MapProps>({ zoom: 13 });
  const [currentPosition, setCurrentPosition] = useState({
    lat: 34.665442,
    lng: 135.432338,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpenBottom, setIsOpenBottom] = useState(false);
  const [img, setImg] = useState("");
  const [contents, setContents] = useState("");
  const [link, setLink] = useState("");
  const [period, setPeriod] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [tagList, setTagList] = useState("");
  const [modalEventListHidden, setmodalEventListHidden] = useState(true);
  const [selectedButtonId, setselectedButtonId] = useState(null);
  const [mapHeight, setmapHeight] = useState("100%");

  function handleButtonClick(buttonId) {
    setselectedButtonId(buttonId);
  }

  useEffect(() => {
    setCenter(center);
  }, [center]);

  useEffect(() => {
    setZoom(zoom);
  }, [zoom]);

  //現在位置にマップが戻るようにする関数
  async function successCallback(position) {
    // 緯度・経度を取得しcenterを更新
    let latitude: number = await position.coords.latitude;
    let longitude: number = await position.coords.longitude;
    await setCenter({ lat: latitude + 0.00001, lng: longitude + 0.00001 });
    await setCenter({ lat: latitude, lng: longitude });
  }

  //ボタンなどで使用する関数現在のマップのズーム倍率を参照し、10~16の値であればそのままの倍率を維持する。それ以外は以下のように条件分岐するして倍率を変更する。
  function initizalZoomValue() {
    if (zoom.zoom < 10) {
      setZoom({ zoom: 10 });
    } else if (zoom.zoom > 16) {
      setZoom({ zoom: 16 });
    }
  }

  //イベントリストで要素をクリックしたときに位置が変わる
  function changeMapCenter(isState) {
    setCenter(isState);
  }

  // ↓マップの倍率の状態を確認する為の記述
  interface MapProps {
    zoom: number;
  }
  const changeMap = (v: ChangeEventValue) => {
    const nextMapProps = {
      zoom: v.zoom,
    };
    setZoom(nextMapProps);
  };
  useEffect(() => {
    // TODO: mapのzoom状態変更時に合わせて処理を入れる
  }, [zoom]);
  //↑マップの倍率の状態を確認する為の記述

  function choiceEventItemSetMarkerPosition(v, z) {
    if (z.zoom < 10) {
      initizalZoomValue();
      setCenter({ lat: v.lat, lng: v.lng });
    } else if (z.zoom > 16) {
      initizalZoomValue();
      setCenter({ lat: v.lat, lng: v.lng });
    } else {
      setCenter({ lat: v.lat, lng: v.lng });
    }
  }

  //ページ表示時に現在位置を取得してマップ上に表示する関数
  function getgeolocation() {
    const success = (data) => {
      const currentPosition = {
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      };
      setCurrentPosition(currentPosition);
      setCenter(currentPosition);
    };

    const error = (data) => {
      const currentPosition = {
        lat: 34.673542,
        lng: 135.433338,
      };
      setCurrentPosition(currentPosition);
      setCenter(currentPosition);
    };
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    const changeState = () => {
      setIsOpen(!isOpen);
    };
  }
  getgeolocation();

  const themeColor = () => {
    if (theme === lightTheme) {
      return lightTheme.palette.background.paper;
    } else {
      return darkTheme.palette.background.paper;
    }
  };

  const { theme, setTheme } = useContext(ThemeSet);
  const [modalBackgroundColor, setmodalbackgroundColor] = useState("");
  useEffect(() => {
    if (theme === lightTheme) {
      setmodalbackgroundColor("rgba(255, 255, 255, 0.8)");
    } else if (theme === darkTheme) {
      setmodalbackgroundColor("rgba(0, 0, 0, 0.7)");
    }
  }, [theme]);

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        width: "100%",
        position: "fixed",
        top: "9vh",
        zIndex: 1,
        height: "84vh",
        [theme.breakpoints.up("sm")]: {
          height: "91vh",
          flexShrink: 0,
        },
      },
      myLocationButton: {
        position: "fixed",
        zIndex: 20,
        right: "10px",
        bottom: "19vh",
        [theme.breakpoints.up("sm")]: {
          bottom: "11vh",
        },
      },
      //modalEventListのdrawerのスタイル
      drawerPaper: {
        [theme.breakpoints.up("sm")]: {
          width: "60%",
          height: "100vh",
          backgroundColor: modalBackgroundColor,
          flexShrink: 0,
          padding: 10,
          right: "0 !important",
          left: "auto !important",
        },
        [theme.breakpoints.down("xs")]: {
          backgroundColor: modalBackgroundColor,
          width: "100%",
          flexShrink: 0,
          padding: 15,
        },
      },
      //modalBottomのdrawerのスタイル
      drawerPaperBottom: {
        [theme.breakpoints.up("sm")]: {
          width: "100%",
          height: "40vh",
          flexShrink: 0,
          padding: 10,
          right: "0 !important",
          top: "none !important",
          left: "auto !important",
        },
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          flexShrink: 0,
          padding: 15,
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <>
      <NavBar
        setmodalEventListHidden={setmodalEventListHidden}
        modalEventListHidden={modalEventListHidden}
        setModalLoginOpen={setModalLoginOpen}
        modalLoginOpen={modalLoginOpen}
      />

      <BottomMenuBar
        setmodalEventListHidden={setmodalEventListHidden}
        modalEventListHidden={modalEventListHidden}
        setModalLoginOpen={setModalLoginOpen}
        modalLoginOpen={modalLoginOpen}
      />

      <Drawer
        style={{ right: "0 !important", left: "none !important" }}
        variant="temporary"
        anchor={"bottom"}
        open={!modalEventListHidden}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <ModalEventList
          initialEventList={props.EventList}
          modalEventListHidden={modalEventListHidden}
          EventList={eventList}
          setEventListMarker={setEventListMarker}
          CreateEventList={props.createEventList}
          setmodalEventListHidden={setmodalEventListHidden}
          changeMapCenter={changeMapCenter}
          setEventList={setEventList}
          setselectedButtonId={setselectedButtonId}
          switchRecom={switchRecom}
          setSwitchRecom={setSwitchRecom}
          switchFavorite={switchFavorite}
          setSwitchFavorite={setSwitchFavorite}
        />
      </Drawer>

      <MuiThemeProvider
        theme={createTheme({
          overrides: {
            MuiBackdrop: {
              root: {
                top: "none",
              },
            },
            MuiPaper: {
              root: {
                backgroundColor: themeColor,
              },
            },
          },
        })}
      >
        <Drawer
          style={{
            top: "none !important",
          }}
          variant="temporary"
          anchor={"bottom"}
          open={modalIsOpenBottom}
          classes={{
            paper: classes.drawerPaperBottom,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <ModalBottom
            setmapHeight={setmapHeight}
            modalIsOpenBottom={modalIsOpenBottom}
            setIsOpenBottom={setIsOpenBottom}
            img={img}
            contents={contents}
            link={link}
            period={period}
            streetAdress={streetAddress}
            tagList={tagList}
            changeMarker={handleButtonClick}
          />
        </Drawer>
      </MuiThemeProvider>

      <ModalLogin
        modalLoginOpen={modalLoginOpen}
        setModalLoginOpen={setModalLoginOpen}
        userTagList={userTagList}
        setSwitchRecom={setSwitchRecom}
      />

      <div className={classes.root}>
        {/* 現在位置へ戻すボタン */}
        {center === { lat: 0, lng: 0 } ? (
          <></>
        ) : (
          <div
            className={commonClasses.buttonTop}
            onClick={() => {
              navigator.geolocation.getCurrentPosition(successCallback);
              initizalZoomValue();
            }}
          >
            <MyLocationButton />
          </div>
        )}

        <div style={{ height: mapHeight }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: APIKEY }}
            center={center}
            defaultZoom={14}
            zoom={zoom.zoom}
            onChange={changeMap}
            options={createMapOptions}
            // center={{ lat: center.lat, lng: center.lng }}
            // onGoogleApiLoaded={handleApiLoaded}
          >
            <PersonMarker
              lat={currentPosition.lat}
              lng={currentPosition.lng}
              name="My CustumMarker"
            />
            {eventListMarker.map((list) => {
              let i = 0;
              return (
                <CustumMarker
                  setmapHeight={setmapHeight}
                  choiceEventItemSetMarkerPosition={
                    choiceEventItemSetMarkerPosition
                  }
                  zoom={zoom}
                  markerSelect={handleButtonClick}
                  isSelected={selectedButtonId === list.title}
                  id={list.title}
                  lat={list.longitudeLatitude[0]}
                  lng={list.longitudeLatitude[1]}
                  setIsOpenBottom={setIsOpenBottom}
                  // setZoom={setZoom}
                  // setCenter={setCenter}
                  setImg={setImg}
                  setContents={setContents}
                  setLink={setLink}
                  setPeriod={setPeriod}
                  setStreetAddress={setStreetAddress}
                  setTagList={setTagList}
                  item={list}
                ></CustumMarker>
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const Event = [];
  const fireStoredbEventList = await fireStoreDB.collection("eventList").get();
  //firestoreのドキュメントIDも同時に格納
  let i = 0;
  await fireStoredbEventList.docs.map((doc) => {
    Event.push(doc.data());
    Event[i].docId = doc.id;
    i++;
  });

  const createEventList = [];
  const fireStoredbCreateEvent = await fireStoreDB
    .collection("createEvent")
    .get();
  let i2 = 0;
  await fireStoredbCreateEvent.docs.map((doc) => {
    createEventList.push(doc.data());
    createEventList[i2].docId = doc.id;
    i2++;
  });

  let EventList;
  EventList = await Event.concat(createEventList);

  const userTagList = [];
  const fireStoredbUserTagList = await fireStoreDB.collection("users").get();
  await fireStoredbUserTagList.docs.map((doc) => {
    userTagList.push(doc.data());
  });

  return {
    props: {
      EventList,
      createEventList,
      userTagList,
    },
  };
}
