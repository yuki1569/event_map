
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
// import "../styles.css";
import { eventDB } from '../../lib/db'
import { delBasePath } from "next/dist/next-server/lib/router/router";
import Markertest from './marker';
import ModalBottom from '../ModalBottom';

const APIKEY = "";

export default function Maps ()  {
  const [center, setCenter] = useState({ lat: 34.665442, lng: 135.432338 });
  const [zoom, setZoom] = useState(13);
  const [currentPosition, setCurrentPosition] = useState({ lat: 34.665442, lng: 135.432338 });
  const [isOpen, setIsOpen] = useState(false);

  // 初期表示地点
  function getgeolocation() {
    const success = data => {
        const currentPosition = {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        };
        setCurrentPosition(currentPosition);
        setCenter(currentPosition);
    };
  
     const error = data => {
      const currentPosition = {
        lat: 34.673542,
        lng: 135.433338
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

  getgeolocation()

  const [modalIsOpenBottom, setIsOpenBottom] = useState(false);
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');
  
  const handleApiLoaded = ({ map, maps }) => {
    eventDB.map((db) => {
      let streetadress = db.streetAddress.split(',')
      let lat = Number(streetadress[0])
      let lng = Number(streetadress[1])
      new maps.Marker({
        position: { lat:lat, lng:lng },
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
      
    })
    
  };


  return (
    <>
      <ModalBottom modalIsOpenBottom={modalIsOpenBottom} setIsOpenBottom={setIsOpenBottom} img={img} contents={contents} />
    <div style={{ height: "82vh", width: "100%", position: 'fixed', top: '11vh', zIndex: 1 }}>
      
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        center={center}
        defaultZoom={zoom}
        onGoogleApiLoaded={handleApiLoaded}
      >
       <Markertest
             lat={currentPosition.lat}
             lng={currentPosition.lng}
             name="My Marker"
             color="blue"
            />
        {/* {
         dataBase.map((db) => {
            let streetadress = db.streetAddress.split(',');
            let lat = Number(streetadress[0]);
            let lng = Number(streetadress[1]);
           return (
             <Markertest
               lat={lat}
               lng={lng}
               name="My Marker"
               color="blue"
               key={db.title}
              />
           );
          })
        } */}
        {/* {currentPosition ? (
          <Marker
            lat={currentPosition.lat}
            lng={currentPosition.lng}
            text="My Marker"
            color="blue"
            changeState={changeState}
          />
        ) : null} */}
        {/* {isOpen ? (
          <Baloon lat={currentPosition.lat} lng={currentPosition.lng} />
        ) : null} */}
      </GoogleMapReact>
      </div>
      </>
  );
};
