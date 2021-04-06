import Modal from 'react-modal'
import DetailsModal from './Modaldetails'
import { useState } from "react";


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

export default function BookMarkModal({ modalIsOpen, setIsOpen, db }: {
    modalIsOpen: boolean;
    setIsOpen: any;
    db: any;
})
{
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');

    return (
      < >
        <DetailsModal modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents}/>
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
              db.map((value) =>
                <div
                  onClick={() => {
                    setIsOpenDetails(true);
                    setImg(value.thumbnail);
                    setContents(value.contents);
                  }}
                  style={{ margin: '10px',flexGrow: '1', width: '30vh' }}>
              <li style={{color:'white'}}>{value.title}</li>
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

