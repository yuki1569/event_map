import Modal from 'react-modal'

const customStyles = {
  overlay: {
    position: "fixed",
    left: 0,
    top:'45%',
    zIndex: 9,
    // backgroundColor: "rgba(0,0,0,0.3)",
    // overflowY: "scroll",
  },

  content: {
    backgroundColor: "rgba(10,0,0,0.3)",
    border: 'hidden',
    listStyle:'none',
    display: 'flex',
    flexWrap: 'wrap',
    // marginTop:'25px' ,
    top                   : '0',
    left                  : '0',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-20%',
    width                 : '90%',
    height                : '90%',
    // transform: 'translate(-50%, -50%)',
    
  }
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

export default function ModalBottom({ modalIsOpenBottom, setIsOpenBottom, img,contents,link,period,streetAdress,tagList }: {
    modalIsOpenBottom: boolean;
    setIsOpenBottom: any;
    img: string;
    contents: string;
    link: string;
    period: string;
    streetAdress: string;
    tagList: string;
})

{
    return (
      < >
        <Modal
          // isOpenがtrueならモダールが起動する※Modalのプロパティ
          isOpen={modalIsOpenBottom}
          // モーダルが開いた後の処理を定義
          // onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          onRequestClose={() => setIsOpenBottom(false)}
          // スタイリングを定義
          style={customStyles}
        >
          <div
            // style={{ margin: '0', width: '100vh', display: 'flex' }}
          >
            
            <img src={img} style={{ width: '40%', maxWidth:'250px'}}/>
            
            <li style={{ color: 'white' }}>
              <a target="_blank" href={link}>サイトへ</a>
            </li>
            <li style={{ color: 'white' }}>{period}
            </li>
            <li style={{ color: 'white' }}>{streetAdress}
            </li>
            <li style={{ color: 'white' }}>{tagList}
            </li>
            <li style={{ color: 'white' }}>{contents}
            </li>

              </div>
          
        </Modal>
        <style jsx>{`

      `}</style>
      </>
    )
}

