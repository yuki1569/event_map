import React, { useState, useEffect } from "react";
import GoogleMapReact, { MapOptions, Maps }  from "google-map-react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Marker from "../components/map/marker";
import PersonMarker from "../components/map/PersonMarker";
import ModalBottom from "../components/ModalBottom";
import MyLocationButton from '../components/Button/MyLocationButton';
import BottomMenuBar from '../components/BottomMenuBar';
import NavBar from '../components/NavBar'
import {
  auth,
  fireStoreDB,
  firebaseUser,
} from "../src/firebase";
import Geocode from "react-geocode";
import ModalEventList from "../components/ModalEventList"
import { db } from '../db/db'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // height: '7vh',
      top: 'auto',
      bottom: 0,
    },
    icon: {
      color:'white'
      // textAlign: 'center'
    },

  }),
);

const APIKEY = "";
Geocode.setApiKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`);

export default function CreateMaps( props ) {
  

  const createMapOptions = (maps: Maps): MapOptions => {
    // console.log(props.userTagList)
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e9e9e9',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffffff',
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
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dedede',
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on',
            },
            {
              color: '#ffffff',
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36,
            },
            {
              color: '#333333',
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f2f2f2',
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fefefe',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#fefefe',
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
    }
  }
  const [eventList, setEventList] = useState(props.EventList)
  const [eventListMarker, setEventListMarker] = useState(props.EventList)
  const [center, setCenter] = useState({ lat: 34.665442, lng: 135.432338 });
  const [zoom, setZoom] = useState(13);
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
  const [modalHidden, setmodallHidden] = useState(true)


  useEffect(() => {
  setCenter(center)
  }, [center])

  useEffect(() => {
    setZoom(zoom)
  }, [zoom])

//   const testtagList = []
//   function IsArrayExists(array, value) {
//   // 配列の最後までループ
//   for (var i =0, len = array.length; i < len; i++) {
//     if (value == array[i]) {
//       // 存在したらtrueを返す
//       return true;
//     }
//   }
//   // 存在しない場合falseを返す
//   return false;
// }
//   eventList.map(lists => {
//     lists.tagList.map(list => {
//       if (!IsArrayExists(testtagList, list)) {
//         testtagList.push(list)
//       }
//       })
//     })
    // console.log(testtagList)

//現在位置にマップが戻るようにする関数
async function successCallback(position){
  // 緯度・経度を取得しcenterを更新
  let latitude:number = await position.coords.latitude;
  let longitude: number = await position.coords.longitude;
  await setCenter({ lat: latitude+0.00001, lng: longitude+0.00001 })
  await setCenter({ lat: latitude, lng: longitude })
  };

//マップのズーム倍率がディフォルト14に戻るようにする関数
async function initizalZoomValue(){
  await setZoom(13)
  await setZoom(14)
};

//イベントリストで要素をクリックしたときに位置が変わる
function changeMapCenter(isState) {
  setCenter(isState)
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

//マップが読み込まれるときにマーカーなどを配置する関数
  // const handleApiLoaded =
  //   useEffect(() => {
  //   ({ map, maps }) => {
      
  //     eventList.map((db) => {
  //     let lat = Number(db.longitudeLatitude[0])
  //     let lng = Number(db.longitudeLatitude[1])
  //     new maps.Marker({
  //       position: { lat: lat, lng: lng },
  //       map,
  //     }).addListener("click", () => {
  //       map.setCenter({ lat: (lat - 0.011), lng: lng });
  //       map.setZoom(14);
  //       setIsOpenBottom(true);
  //       setImg(db.thumbnail);
  //       setContents(db.contents);
  //       setLink(db.link);
  //       setPeriod(db.period);
  //       setStreetAddress(db.streetAdress);
  //       setTagList(db.tagList);
  //     });
  //   })

  //     props.createEventList.map((db) => {
  //       // Geocode.fromAddress(db.streetAddress).then(
  //         // (response) => {
  //           // const { lat, lng }:{lat:number,lng:number} = response.results[0].geometry.location;
  //       const lat =db.longitudeLatitude.lat
  //       const lng =db.longitudeLatitude.lng
  //       new maps.Marker({
  //         position: { lat:lat , lng:lng },
  //         map,
  //       }).addListener("click", () => {
  //         map.setCenter({ lat: (lat - 0.011), lng: lng });
  //         map.setZoom(14);
  //         setIsOpenBottom(true);
  //         setImg(db.thumbnail);
  //         setContents(db.contents);
  //         setLink(db.link);
  //         setPeriod(db.period);
  //         setStreetAddress(db.streetAdress);
  //         setTagList(db.tagList);
  //       })
  //     // },
  //       //   (error) => {
  //       //     console.error(error);
  //       //   }
  //       // );
  //     })
  //   }
    
  //      }, [eventList]);
       
      
  

  return(
    <>
      <NavBar/>
      <BottomMenuBar 
        setmodallHidden={setmodallHidden}
        modalHidden={modalHidden}
      />
      <ModalEventList
        initialEventList={props.EventList}
        modalHidden={modalHidden}
        userTagList={props.userTagList}
        EventList={eventList}
        setEventListMarker={setEventListMarker}
        CreateEventList={props.createEventList}
        setmodallHidden={setmodallHidden}
        changeMapCenter={changeMapCenter}

        setEventList={setEventList}
        // setEventListToMap={setEventList}
       />
        <ModalBottom
        modalIsOpenBottom={modalIsOpenBottom}
        setIsOpenBottom={setIsOpenBottom}
        img={img}
        contents={contents}
        link={link}
        period={period}
        streetAdress={streetAddress}
        tagList={tagList}
       />
          
      <div
        style={{
          height: "84vh",
          width: "100%",
          position: "fixed",
          top: "9vh",
          zIndex: 1,
        }}
      >
        {
        center === { lat: 0, lng: 0 }
        ? <div>n</div>
        : 
        <div
        style={{
          position: 'fixed',
          zIndex:20,
          right:'10px',
          bottom: '18vh',
        }}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(successCallback)
           initizalZoomValue()
        }}
        >
        <MyLocationButton />
        </div>
        }

        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKEY }}
          center={center}
          // center={{ lat: center.lat, lng: center.lng }}
          defaultZoom={14}
          zoom={zoom}
          // onGoogleApiLoaded={handleApiLoaded}
          options={createMapOptions}
        >
          <PersonMarker
          lat={currentPosition.lat+0.00005}
          lng={currentPosition.lng}
          name="My Marker"
          color="red"
        />

          {
         eventListMarker.map(list => {
              return (
              <Marker
                  lat={list.longitudeLatitude[0]}
                  lng={list.longitudeLatitude[1]}
                  
                  // name="My Marker"
                  color="blue"
                  setIsOpenBottom={setIsOpenBottom}
                  setZoom={setZoom}
                  setCenter={setCenter}
                  setImg={setImg}
                  setContents={setContents}
                  setLink={setLink}
                  setPeriod={setPeriod}
                  setStreetAddress={setStreetAddress}
                  setTagList={setTagList}
                  item={list}
                >
                </Marker>
              )
            })
          }
          
        
    
 
        </GoogleMapReact>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const EventList = await db;
  const tagList = [];
  // const fireStoredbEventList = await fireStoreDB.collection('eventList').get();
  // await fireStoredbEventList.docs.map((doc) => {
  //     eventList.push(doc.data())
  // });
  

  const createEventList = []
  const fireStoredbCreateEvent = await fireStoreDB.collection('createEvent').get();
  await fireStoredbCreateEvent.docs.map((doc) => {
        createEventList.push(doc.data())
  });

  const userTagList = []
  const fireStoredbUserTagList = await fireStoreDB.collection('users').get();
  await fireStoredbUserTagList.docs.map((doc) => {
        userTagList.push(doc.data())
  });
  
  return {
    props: {
      EventList,
      createEventList,
      userTagList
    },
  }
}


