import Modal from 'react-modal'
import ModalEventListDetails from './ModalEventListDetails'
import { useState,useEffect,ReactElement, } from "react";
import {  auth, fireStoreDB, firebaseUser } from '../src/firebase';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModalCloseButton from './Button/ModalCloseButton';
import SearchTextField from './SearchTextField'
import ToggleButtons from '../components/Button/ToggleButoon'
import SwitchCom from '../components/Swith'


export default function ModalEventList(props) {
  function toggle(bool) {
    if (bool) {
      return 'none'
    } else {
      return ''
    }
  }
  
//モーダルウィンドウ用のスタイル
const customStyles = {
  overlay: {
    position: "fixed",
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
    display:toggle(props.modalHidden)
  },

  content: {
    backgroundColor: "rgba(0,0,0,0)",
    border: 'hidden',
    listStyle:'none',
    // display: 'flex',
    // flexWrap: 'wrap',
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

  const initialEventList = props.EventList;
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [modalEventList, setModalEventList] = useState(initialEventList);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 34.673542,
    lng: 135.433338,
  });
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');
  const [favoritehide, setfavoritehide] = useState(true);

  const [listUpDate, setListUpDate] = useState(true);
  const [bookMark, setBookMark] = useState([]);

  // const [searchValue, setSearchValue] = useState([])
  const [onRecommendValue, setOnRecommendValue] = useState([])

  // const AlleventList = Object.assign(EventList, CreateEventList);
  
  // const tag = []
  // AlleventList.map(list => {
  //   tag.push(list.tagList)
  // })

  // console.log(tag);
  // console.log(AlleventList);

  // useEffect(() => {
  //   setSearchValue(searchValue)
  //   // setModalEventList(searchValue)
  // }, [searchValue])

  useEffect(() => {
    setOnRecommendValue(onRecommendValue)
    setModalEventList(onRecommendValue)
  }, [onRecommendValue])

  useEffect(() => {
    const searchBookMark = async() => {
      const res = await fireStoreDB.collection('bookMark').get();
      if (res.empty) return [];
      const BookMarkList = [];
      const key = [];

      res.docs.map((doc,index) => {
        BookMarkList.push(doc.data());
        key.push(index)
      })
      
      setBookMark(BookMarkList);
    }

    searchBookMark();
}, [listUpDate]);


    // 2点間座標のの距離を求める関数
  function distance(lat1, lng1, lat2, lng2) {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    return Math.round(6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 10) / 10;
  }

 
   function sortDateAscendingOrder
    () {
    modalEventList.sort(function (a, b) {
      if (a.endDate > b.endDate) {
        return 1;
      } else {
        return -1;
      }
    })
    const db = []
    modalEventList.map(event => {
      db.push(event)
    })
    return db
  }
  function sortDateDescendingOrder
    () {
    modalEventList.sort(function (a, b) {
      if (a.endDate < b.endDate) {
        return 1;
      } else {
        return -1;
      }
    })
    const db = []
    modalEventList.map(event => {
      db.push(event)
    })
    return db
  }
  function sortDistanceAscendingOrder
    () {
    modalEventList.sort(function (a, b) {
      let A = distance(currentPosition.lat, currentPosition.lng, a.longitudeLatitude[0], a.longitudeLatitude[1])
      let B = distance(currentPosition.lat, currentPosition.lng, b.longitudeLatitude[0], b.longitudeLatitude[1])
      if (A > B) {
        return 1;
      } else {
        return -1;
      }
    })
    const db = []
    modalEventList.map(event => {
      db.push(event)
    })
    return db
  }
  function sortDistanceDescendingOrder
    () {
    modalEventList.sort(function (a, b) {
      let A = distance(currentPosition.lat, currentPosition.lng, a.longitudeLatitude[0], a.longitudeLatitude[1])
      let B = distance(currentPosition.lat, currentPosition.lng, b.longitudeLatitude[0], b.longitudeLatitude[1])
      if (A < B) {
        return 1;
      } else {
        return -1;
      }
    })
    const db = []
    modalEventList.map(event => {
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

  useEffect(() => {
      setModalEventList(modalEventList)
    }, [modalEventList])
  


  return (
    <div >
      


      {/* リストごとの詳細画面用モーダル */}
      <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} />
       {/* リストごとの詳細画面用モーダル */}

      {/* イベントリストモーダルを閉じるボタン */}
      <div
        style={{
          position: 'fixed',
          zIndex:20,
          right:'10px',
          bottom: '8vh',
          display:toggle(props.modalHidden)
          
        }}
        onClick={() => {
          props.setmodallHidden(true)
        }}
      >
      <ModalCloseButton />
      </div>
      {/* イベントリストモーダルを閉じるボタン */}

 
      {/* イベントリストモーダルの中身 */}
      <Modal
        isOpen={true}
        // isOpen={modalIsOpenEventList}
        // onRequestClose={() => setIsOpenEventList(false)}
        style={customStyles}
      >
        <div style={{ marginTop: '0', display: 'inline-block' }}>
          
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
        <SwitchCom
          initialEventList={props.initialEventList}
          userTagList={props.userTagList}
          setOnRecommendValue={setOnRecommendValue}
          setModalEventList={setModalEventList}
          EventList={props.EventList}
          CreateEventList={props.CreateEventList}
          setEventListMarker={props.setEventListMarker}

          setEventList={props.setEventList}
        />
        
        <ToggleButtons
          sortDateAscendingOrder={() => setModalEventList(sortDateAscendingOrder())}
          
          sortDateDescendingOrder={() => setModalEventList(sortDateDescendingOrder())}
          
          sortDistanceAscendingOrder={() => setModalEventList(sortDistanceAscendingOrder())}
          
          sortDistanceDescendingOrder={() => setModalEventList(sortDistanceDescendingOrder())}
        />
        

        <div id='button'>
              <button
                onClick={() => {
                  setfavoritehide(!favoritehide
                   )
                  setListUpDate(!listUpDate)
                  }}
                  >
            お気に入りのみ表示
              </button>
          </div>

      <div id='favoriteList' style={{display:toggle(favoritehide)}}>
        {
            auth.currentUser
              ? bookMark.map((value, index) => {
                  if (value.uid === firebaseUser().uid) {
                    return (
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
                                  
                        <li style={{ color: 'white' }} >{value.title}</li>
                        {/* <button>💛</button> */}
                        <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
                      </div>
                    )
                  } else {
                    return (
                      <div>n</div>
                    )
                  }
                })
              : <div>n</div>
            }
            </div>
              
        <div id='eventList'
          style={{
            display: toggle(!favoritehide)
          }}>
        <div id='eventList'
          style={{
            display: 'flex',
            flexFlow: 'flow',
            flexWrap: 'wrap'
          }}>
            {
          modalEventList.map((value, index) =>
          
        <div
        key={index}
        
        style={{
          margin: '10px',
          flexGrow: 1,
          width: '30vh'
        }}>


          <p style={{ color: 'white' }}
            onClick={() => {
              props.changeMapCenter({lat: Number(value.longitudeLatitude[0]), lng:Number(value.longitudeLatitude[1])})
            }}>
            {distance(currentPosition.lat, currentPosition.lng, value.longitudeLatitude[0], value.longitudeLatitude[1])}km先
          </p>

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
        

          <img
            onClick={() => {
          setIsOpenDetails(true);
          setImg(value.thumbnail);
          setContents(value.contents);
        }}
            src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
            

      </div>
    )
          }
      </div>
      </div>
      </Modal>
      {/* イベントリストモーダルの中身 */}


    </div>
    );
  }

