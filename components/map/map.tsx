import React, { useState, useEffect } from "react";
import GoogleMapReact, { MapOptions, Maps }  from "google-map-react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import OriginalMarker from "./marker";
import ModalBottom from "../ModalBottom";
import MyLocationButton from '../Button/MyLocationButton';
import BottomMenuBar from '../BottomMenuBar';
import NavBar from '../NavBar'
import {
  auth,
  fireStoreDB,
  firebaseUser,
  bookMarkQuery,
} from "../../src/firebase";
import Geocode from "react-geocode";
import ModalEventList from "../ModalEventList"

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

// export async function createEventGet() {
//   const fireStoredb = await fireStoreDB.collection('createEvent').get();
//   const createEventList = []
//   await fireStoredb.docs.map((doc) => {
//     createEventList.push(doc.data())
//     });
//   // console.log(query);
//   return createEventList ;
// }

export default function CreateMaps() {
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

  // const classes = useStyles();
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
  const [modalIsOpenEventList, setIsOpenEventList] = useState(false);
  const [modalHidden, setmodallHidden] = useState(true)
 

  //イベントリストで要素をクリックしたときに位置が変わる
  const changeMapCenter = (isState) => {
　setCenter(isState)
}

  // 初期表示地点
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

  const handleApiLoaded = ({ map, maps }) => {

  async function getFireStoreEventList() {
    const fireStoredb = await fireStoreDB.collection('eventList').get();
    const eventList = []
    await fireStoredb.docs.map((doc) => {
      eventList.push(doc.data())
      console.log(eventList)
    });
    await eventList.map((db) => {
      let lat = Number(db.longitudeLatitude[0])
      let lng = Number(db.longitudeLatitude[1])
      new maps.Marker({
        position: { lat: lat, lng: lng },
        map,
        // title: beach[0],
        // zIndex: beach[3],
      }).addListener("click", () => {
        map.setCenter({ lat: (lat - 0.015), lng: lng });
        map.setZoom(14);
        setIsOpenBottom(true);
        setImg(db.thumbnail);
        setContents(db.contents);
      })

      // Geocode.fromAddress(db.streetAddress).then(
      //   (response) => {
      //     const { lat, lng } = response.results[0].geometry.location;
      //     console.log(lat, lng);
      //     // let lat = Number(streetadress[0])
      //     // let lng = Number(streetadress[1])
      //     new maps.Marker({
      //       position: { lat: lat, lng: lng },
      //       map,
      //       // title: beach[0],
      //       // zIndex: beach[3],
      //     }).addListener("click", () => {
      //       map.setCenter({ lat: lat, lng: lng });
      //       setIsOpenBottom(true);
      //       setImg(db.thumbnail);
      //       setContents(db.contents);
      //     })
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
    })
  }
  getFireStoreEventList();

  async function getFireStoreCreateEvent() {
      const fireStoredb = await fireStoreDB.collection('createEvent').get();
      const createEventList = []
      await fireStoredb.docs.map((doc) => {
        createEventList.push(doc.data())
      });
      await createEventList.map((db) => {
        Geocode.fromAddress(db.streetAddress).then(
          (response) => {
            const { lat, lng }:{lat:number,lng:number} = response.results[0].geometry.location;
            console.log(lat, lng);
        new maps.Marker({
          position: { lat: lat, lng: lng },
          map,
        }).addListener("click", () => {
          map.setCenter({ lat: (lat - 0.015), lng: lng });
          map.setZoom(14);
          setIsOpenBottom(true);
          setImg(db.thumbnail);
          setContents(db.contents);
        })
      },
          (error) => {
            console.error(error);
          }
        );
      })
  }
  getFireStoreCreateEvent()
  }
  
  useEffect(() => {
  setCenter(center)
  }, [center])
  
async function successCallback(position){
    // 緯度・経度を取得しcenterを更新
    let latitude:number = await position.coords.latitude;
    let longitude: number = await position.coords.longitude;

  await setCenter({ lat: latitude+0.00001, lng: longitude+0.00001 })
  await setCenter({ lat: latitude, lng: longitude })
};


  // 取得に成功した場合の処理
  return(
    <>
      <BottomMenuBar 
        setmodallHidden={setmodallHidden}
        modalHidden={modalHidden}
      />
      <ModalEventList  setmodallHidden={setmodallHidden} modalHidden={modalHidden}
          // modalIsOpenEventList={modalIsOpenEventList}
          // setIsOpenEventList = { setIsOpenEventList }
          changeMapCenter={changeMapCenter}
           />

        <NavBar/>

        <ModalBottom
        modalIsOpenBottom={modalIsOpenBottom}
        setIsOpenBottom={setIsOpenBottom}
        img={img}
        contents={contents}
          />
          
      <div
        style={{
          height: "82vh",
          width: "100%",
          position: "fixed",
          top: "11vh",
          zIndex: 1,
        }}
      >
        {
          center === { lat: 0, lng: 0 }
            ? <div></div>
        : 
        <div
        style={{
          position: 'fixed',
          zIndex:20,
          right:'10px',
          bottom: '17vh',
        }}
        onClick={() =>
          navigator.geolocation.getCurrentPosition(successCallback)
          }
      >
        <MyLocationButton />
      </div>
        }
        {/* <a
          style={ {position:'fixed',zIndex:10} }
          onClick={() =>
          // setIsOpenEventList(true)
          }>ボタン
          </a>
        <a
          style={ {position:'fixed',top:'100px',zIndex:12} }
          onClick={() =>
          }>ボタン2
          </a> */}
        
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKEY }}
          center={{ lat: center.lat, lng: center.lng }}
          defaultZoom={zoom}
          onGoogleApiLoaded={handleApiLoaded}
          options={createMapOptions}
        >

          <OriginalMarker
            lat={currentPosition.lat}
            lng={currentPosition.lng}
            name="My Marker"
            color="blue"
          />
          
          {/* {isOpen ? (
          <Baloon lat={currentPosition.lat} lng={currentPosition.lng} />
        ) : null} */}
        </GoogleMapReact>
      </div>
    </>
  );
}
