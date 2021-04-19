import Modal from 'react-modal'
import ModalEventListDetails from '../../components/ModalEventListDetails'
import { useState } from "react";
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

// アプリのルートを識別するクエリセレクタを指定する。
// Modal.setAppElement('#__next')

export default function ModalEventList({ modalIsOpen, setIsOpen }: {
  modalIsOpen: boolean;
  setIsOpen: any;
}) {
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');
  let dbtest =eventDB
 
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
          isOpen={true}
          // モーダルが開いた後の処理を定義
          // onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          // onRequestClose={() => setIsOpen(false)}
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
                  style={{
                    margin: '10px',
                    // flexGrow: '1',
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
