import Modal from 'react-modal'
import ModalCloseButton from './Button/ModalCloseButton';


const customStyles = {
  overlay: {
    position: "fixed",
    left: 0,
    // backgroundColor: "rgba(0,0,0,0.3)",
    scrollBars: 'red',
    zIndex:40,
    
    // overflowY: "scroll",
  },

  content: {
    backgroundColor: "rgba(10,0,0,0.3)",
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

export default function DetailsModal({ modalIsOpenDetails, setIsOpenDetails, img,contents }: {
    modalIsOpenDetails: boolean;
    setIsOpenDetails: any;
    img: any;
    contents: any;
})

{
    return (
      < >
        <Modal
          // isOpenがtrueならモダールが起動する※Modalのプロパティ
          isOpen={modalIsOpenDetails}
          // モーダルが開いた後の処理を定義
          // onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          onRequestClose={() => setIsOpenDetails(false)}
          // スタイリングを定義
          style={customStyles}
        >
            <div
        style={{
          position: 'fixed',
          zIndex:20,
          right:'10px',
          bottom: '8vh',
        }}
        onClick={() => setIsOpenDetails(false)}
      >
      <ModalCloseButton />
      </div>
              <div style={{ margin: '10px', width: '30vh' }}>
              <img src={img} style={{ width:'100%'}}/>
            <li style={{ color: 'white' }}>{contents}</li>
          </div>
          
        </Modal>
        <style jsx>{`

      `}</style>
      </>
    )
}

