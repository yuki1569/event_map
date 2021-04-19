import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
// import "../styles.css";
import OriginalMarker from "./marker";
import ModalBottom from "../ModalBottom";
import {
  auth,
  fireStoreDB,
  firebaseUser,
  bookMarkQuery,
} from "../../src/firebase";
import Geocode from "react-geocode";

const APIKEY = "";
Geocode.setApiKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`);

export async function get() {
  const fireStoredb = await fireStoreDB.collection('createEvent').get();
  const createEventList = []
  await fireStoredb.docs.map((doc) => {
    createEventList.push(doc.data())
    });
  // console.log(query);
  return createEventList ;
}

export default function Maps() {
  const [center, setCenter] = useState({ lat: 34.665442, lng: 135.432338 });
  const [zoom, setZoom] = useState(13);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 34.665442,
    lng: 135.432338,
  });
  const [isOpen, setIsOpen] = useState(false);

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

  const [modalIsOpenBottom, setIsOpenBottom] = useState(false);
  const [img, setImg] = useState("");
  const [contents, setContents] = useState("");


  const handleApiLoaded = ({ map, maps }) => {

  async function getFireStoreEventList() {
    const fireStoredb = await fireStoreDB.collection('eventList').get();
    const eventList = []
    await fireStoredb.docs.map((doc) => {
      eventList.push(doc.data())
      console.log(eventList)
    });
    await eventList.map((db) => {
      Geocode.fromAddress(db.streetAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          // let streetadress = db.streetAddress.split(',')
          // let lat = Number(streetadress[0])
          // let lng = Number(streetadress[1])
          new maps.Marker({
            position: { lat: lat, lng: lng },
            map,
            // title: beach[0],
            // zIndex: beach[3],
          }).addListener("click", () => {
            // console.log(db.title)
            map.setCenter({ lat: lat, lng: lng });
            // console.log('test');
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
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
        new maps.Marker({
          position: { lat: lat, lng: lng },
          map,
        }).addListener("click", () => {
          map.setCenter({ lat: lat, lng: lng });
          setIsOpenBottom(true);
          setImg(db.thumbnail);
          setContents(db.contents);
        })
      },
          (error) => {
            // console.error(error);
          }
        );
      })
  }
  getFireStoreCreateEvent()
    
}
useEffect(() => {
setCenter(center)

},[center])


async function successCallback(position){
    // 緯度を取得し画面に表示
    var latitude:number = await position.coords.latitude;
    // 経度を取得し画面に表示
  var longitude: number = await position.coords.longitude;

  await setCenter({ lat: latitude+0.00001, lng: longitude+0.00001 })
  await setCenter({ lat: latitude, lng: longitude })
};


  // 取得に成功した場合の処理


  return (
    <>
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
            : <button onClick={() =>
          navigator.geolocation.getCurrentPosition(successCallback)
  
        }>現在位置</button>
        }
        
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKEY }}
          center={{ lat: center.lat, lng: center.lng }}
          defaultZoom={zoom}
          onGoogleApiLoaded={handleApiLoaded}
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
