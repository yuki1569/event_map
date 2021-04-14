import Modal from 'react-modal'
import ModalEventListDetails from './ModalEventListDetails'
import { useState } from "react";
import { fireStoreDB,firebaseUser } from '../src/firebase';


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

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

export default function ModalEventList({ modalIsOpen, setIsOpen, db }: {
  modalIsOpen: boolean;
  setIsOpen: any;
  db: any;
}) {
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');
  let dbtest =db
  // [{
  //     id: "ミモザ・サクラフェア",
  //     title: "ミモザ・サクラフェア",
  //     subTitle: "ミモザの鮮やかな黄色が園内を鮮やかに彩る",
  //     thumbnail:
  //       "https://ms-cache.walkerplus.com/walkertouch/wtd/event/67/l/340467_2.jpg",
  //     link: "https://www.walkerplus.com/event/ar1040e340467/",
  //     contents:
  //       "到津の森公園の九州最大級規模のミモザ、数百本のサクラが花をつけ、園内が春色に染まる「ミモザ・サクラフェア」。青い空に映える、黄色のミモザとピンクのサクラは実に鮮やか。期間中には、花を食べる動物にミモザやサクラの花をプレゼントする「どうぶつにお花のプレゼント」などのイベントも開催される。",
  //     period: "開催中\n    \n    \n    2021年2月20日(土)～3月31日(水)",
  //     genre: "花・自然",
  //     genre2: "子供と",
  //     streetAddress: "33.873199, 130.847293",
  //   },
  //   {
  //     id: "かき小屋 in ベイサイド",
  //     title: "かき小屋 in ベイサイド",
  //     subTitle: "新鮮でおいしいカキを堪能",
  //     thumbnail:
  //       "https://ms-cache.walkerplus.com/walkertouch/wtd/event/86/l/126086_1.jpg",
  //     link: "https://www.walkerplus.com/event/ar1040e126086/",
  //     contents:
  //       "福岡市内のカキ小屋ブームの火付け役「かき小屋 in ベイサイド」が今年も開催。カキやサザエなどを自分で炭火で焼く楽しみと、高いサービスも受けられるとしてリピーターも多い。目玉はリーズナブルながら新鮮でプリプリとした食感のカキ。今年は半斗缶にカキを入れ、缶のまま直火にかけて蒸し焼きにする豪快な浜料理「ガンガン焼き」が登場し、焼きガキだけでなく旨味が凝縮した蒸しガキも食べられる。そのほか2時間飲み放題付の宴会コース(4500円)やセットメニューも充実しており、海沿いの開放的な屋外スペースで少人数から忘新年会まで幅広いスタイルでカキ料理を楽しむことができる。",
  //     period: "開催中\n    \n    \n    2020年12月1日(火)～2021年3月28日(日)",
  //     genre: "グルメ・フードフェス",
  //     genre2: "子供と",
  //     streetAddress: "33.603859, 130.398799",
  //   }]
  // let test = dbtest[0].period
  // console.log(test.slice( -8 ));
  dbtest.sort(function(a, b) {
  if (a.period.slice( -8 ) < b.period.slice( -8 )) {
    return 1;
  } else {
    return -1;
  }
  })
  console.log(dbtest);

    return (
      < >
        <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} />
        
        <Modal
          // isOpenがtrueならモダールが起動する※Modalのプロパティ
          isOpen={modalIsOpen}
          // モーダルが開いた後の処理を定義
          // onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          onRequestClose={() => setIsOpen(false)}
          // スタイリングを定義
          style={customStyles}
        >
          {
            
            
          
          }

          {
              dbtest.map((value, index) =>
                <div
                  key={index}
                  onClick={() => {
                    setIsOpenDetails(true);
                    setImg(value.thumbnail);
                    setContents(value.contents);
                  }}
                  style={{ margin: '10px',flexGrow: '1', width: '30vh' }}>
                  <li style={{ color: 'white' }} >{value.title}</li>
                  <li style={{ color: 'white' }} >{value.period}</li>
                  <button
                    onClick={() => {
                      fireStoreDB.collection('bookMark').add({
                          uid: firebaseUser().uid,
                          id: value.id,
                          title: value.title,
                          subTitle:value.subTitle,
                          thumbnail: value.thumbnail,
                          link: value.link,
                          contents: value.contents,
                          period: value.period,
                          genre: value.genre,
                          genre2: value.genre2,
                          streetAddress: value.streetAddress,
                        })
                       }}
                  >💛</button>
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

