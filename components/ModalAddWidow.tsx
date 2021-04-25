import Modal from 'react-modal'
import AddForm from './AddForm'



const customStyles = {
  overlay: {
    position: "fixed",
    left: 0,
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 14,
    // overflowY: "scroll",
  },

  content: {
    backgroundColor: "rgba(0,0,0,0)",
    border: 'hidden',
    listStyle:'none',
    // display: 'flex',
    // flexWrap: 'wrap',
    position:'fixed',
    top                   : '',
    left                  : '',
    right                 : '20px',
    bottom                : '50px',
    width                 : '87%',
    height: '87%',
    overflowY: 'scroll',
    marginBottom: '20px',
    // over
    // transform: 'translate(-50%, -50%)',
    maxWidth: '800px'
    
  }
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

export default function ModalAddWidow({ modalIsOpen, setIsOpen}: {
  modalIsOpen: boolean;
  setIsOpen: any;
}) {
 
    return (
      < >
        {/* <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} /> */}
        
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
          <div
            style={{
              margin: '0 auto',
              width:'100%',
              backgroundColor: 'white',
              borderRadius:'3px'
          }}
          >
          <AddForm />
          </div>


          {/* {
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
          } */}
          
        </Modal>
        <style jsx>{`

      `}</style>
      </>
    )
}

