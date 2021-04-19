import Modal from 'react-modal'
import ModalEventListDetails from '../../components/ModalEventListDetails'
import { useState,useEffect } from "react";
import {  auth, fireStoreDB, firebaseUser } from '../../src/firebase';
import { eventDB } from '../../lib/db'

import { useRouter } from 'next/router'
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';

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


export default function EventList() {
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [eventList, setEventList] = useState(eventDB)
  // const [eventList, setEventList] = useState(
  //    [
  // {
  //   title: "海の中道フラワーピクニック2021",
  //   thumbnail:
  //     "//ms-cache.walkerplus.com/walkertouch/wtd/event/04/l/301804_2.jpg",
  //   link: "https://www.walkerplus.com/event/ar1040e301804/",
  //   tagList: [
  //     "花・自然",
  //     "イベントその他",
  //     "子供と",
  //     "恋人と・夫婦で",
  //     "友達と",
  //   ],
  //   contents:
  //     "ネモフィラ120万本の広大な青の花畑や、カラフルなチューリップ8万本など、見どころ満載の福岡に春を告げるイベント「海の中道フラワーピクニック」。特に、4月上旬のサクラのピンクとネモフィラの青のコラボレーションは、うみなかならではの景色。期間中には、週末を中心に、動物ふれあいイベントやクラフト体験などのイベントも開催される。「電動キックボード体験」や「バラのポプリ作り」、福岡のお茶とお菓子を楽しめる「お花見お茶会」など、初開催のイベントも盛りだくさん。",
  //   period: "2021年3月20日(土・祝)～5月23日(日)",
  //   startDate: "2021-03-20",
  //   endDate: "2021-05-23",
  //   streetAddress: "福岡県福岡市東区大字西戸崎18-25",
  // },
  // {
  //   title:
  //     "リアル脱出ゲーム×進撃の巨人The Final Season 5つの巨人からの脱出(福岡)",
  //   thumbnail:
  //     "//ms-cache.walkerplus.com/walkertouch/wtd/event/18/l/398918.jpg",
  //   link: "https://www.walkerplus.com/event/ar1040e398918/",
  //   tagList: [
  //     "体験イベント・アクティビティ",
  //     "アニメ・ゲーム",
  //     "恋人と・夫婦で",
  //     "友達と",
  //     "子供と",
  //   ],
  //   contents:
  //     "リアル脱出ゲームと進撃の巨人のコラボレーションイベント第5弾を開催。参加者は本編に登場する「調査兵団」の一員になりきり、リヴァイやミカサと協力しながら5つの巨人に立ち向かう。アイテムを使い、戦いの舞台となるマーレの街を再現したジオラマ地図を実際に組み立て、その地図を駆使して状況を打開するための作戦を立案することが、脱出の成否を分ける重要なカギ。また、イベント限定の描き下ろしイラストを使用したオリジナルグッズも発売予定。会場だけでなく家でも進撃の巨人の世界観が楽しめる。",
  //   period: "2021年4月29日(木)～5月5日(水)",
  //   startDate: "2021-04-29",
  //   endDate: "2021-05-05",
  //   streetAddress: "福岡県福岡市中央区天神2-11-3",
  // },]);
    
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
  


  useEffect(() => {
    setEventList(eventList)
  },[eventList])

  // const periodList = []
  // dbtest.map(db => {
  //   periodList.push(db.period)
  // })
  // console.log(periodList);

    return (
      < >
        <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} />
        
        

        <Modal
          // isOpenがtrueならモダールが起動する※Modalのプロパティ
          isOpen={true}
          // モーダルが開いた後の処理を定義
          // onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          // onRequestClose={() => setIsOpen(false)}
          // スタイリングを定義
          style={customStyles}
        >
          {
            <>
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
       </>
     
     }

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


              <img src={value.thumbnail} style={{ width:'100%', maxWidth:'450px'}}/>
              </div>
              )
          }
          
        </Modal>
        <style jsx>{`

      `}</style>
      </>
    )
}
