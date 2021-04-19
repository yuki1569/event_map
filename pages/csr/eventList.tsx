import Modal from 'react-modal'
import ModalEventListDetails from '../../components/ModalEventListDetails'
import { useState,useEffect } from "react";
import {  auth, fireStoreDB, firebaseUser } from '../../src/firebase';
import { eventDB } from '../../lib/db'

import { useRouter } from 'next/router'
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Geocode from "react-geocode";

const customStyles = {
  overlay: {
    position: "fixed",
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    scrollBars: 'red',
    zIndex: 10,
    // overflowY: "scroll",
  },

  content: {
    backgroundColor: "rgba(0,0,0,0)",
    border: 'hidden',
    listStyle:'none',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop:'25px' ,
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '87%',
    height                : '82%',
    transform: 'translate(-50%, -50%)',
    
  }
};

export default function EventList (){
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [eventList, setEventList] = useState(eventDB);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 34.673542,
    lng: 135.433338,
  });
    
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');
 
  function sortDateAscendingOrder
    () {
    eventDB.sort(function (a, b) {
      if (a.endDate > b.endDate) {
        return 1;
      } else {
        return -1;
      }
    })
    const db = []
    eventDB.map(event => {
      db.push(event)
    })
    return db
  }
  function sortDateDescendingOrder
    () {
    eventDB.sort(function (a, b) {
      if (a.endDate < b.endDate) {
        return 1;
      } else {
        return -1;
      }
    })
    const db = []
    eventDB.map(event => {
      db.push(event)
    })
    return db
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
  console.log(currentPosition);

  useEffect(() => {
      setEventList(eventList)
    }, [eventList])
  
  // 2点間座標のの距離を求める
  function distance(lat1, lng1, lat2, lng2) {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    return Math.round(6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 10) / 10;
  }
  console.log(distance(currentPosition.lat, currentPosition.lng, 33.5734523, 130.4124632))




  return (
      <>
      <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} />

      <Modal isOpen={true} style={customStyles} >
              <button
                onClick={() => {
                  setEventList(sortDateAscendingOrder
                    ())
                }}
              >
                終了日付昇順
              </button>
              <button
                onClick={() => {
                  setEventList(sortDateDescendingOrder
                    ())
                }}
              >
                終了日付降順
              </button>
      
      {
      eventList.map((value, index) =>
          
        <div
        key={index}
        onClick={() => {
          setIsOpenDetails(true);
          setImg(value.thumbnail);
          setContents(value.contents);
        }}
        style={{
          margin: '10px',
          flexGrow: 1,
          width: '30vh'
          }}>
          
            

          <li>
            {distance(currentPosition.lat, currentPosition.lng, value.longitudeLatitude[0][0], value.longitudeLatitude[0][1])}
          </li>
        <li style={{ color: 'white' }} >{value.title}</li>
        <li style={{ color: 'white' }} >{value.period}</li>
        
          <div
                  onClick={() => {
                    fireStoreDB.collection('bookMark').add({
                      uid: firebaseUser().uid,
                      title: value.title,
                      // subTitle:value.subTitle,
                      thumbnail: value.thumbnail,
                      link: value.link,
                      contents: value.contents,
                      period: value.period,
                      tagList: value.tagList,
                      streetAddress: value.streetAddress,
                    })
                  }}
                >
                    
                  <IconButton
                    color="inherit"
                      
                  >
                    <FavoriteIcon />
                  </IconButton>
                </div>
        

            <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
            

      </div>
    )
      }
    </Modal>


    
      </>
    );
  }

