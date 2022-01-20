import Modal from "react-modal";
import ModalCloseButton from "./Button/ModalCloseButton";

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#__next");

export default function ModalBottom({
  modalIsOpenBottom,
  setIsOpenBottom,
  img,
  contents,
  link,
  period,
  streetAdress,
  tagList,
  changeMarker,
}: {
  modalIsOpenBottom: boolean;
  setIsOpenBottom: any;
  img: string;
  contents: string;
  link: string;
  period: string;
  streetAdress: string;
  tagList: string;
  changeMarker: any;
}) {
  const customStyles = {
    overlay: {
      position: "fixed",
      left: 0,
      top: "45%",
      zIndex: 20,
    },

    content: {
      backgroundColor: "rgba(10,0,0,0.3)",
      border: "hidden",
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      // marginTop:'25px' ,
      top: "0px",
      left: "0",
      right: "auto",
      bottom: "auto",
      marginRight: "-20%",
      width: "100%",
      height: "100%",
      // transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
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
        //modalBottom.tsx
        {/* イベントリストモーダルを閉じるボタン */}
        <div
          style={{
            position: "fixed",
            zIndex: 20,
            right: "10px",
            bottom: "8vh",
          }}
          onClick={() => {
            setIsOpenBottom(false);
            changeMarker("");
          }}
        >
          <ModalCloseButton />
        </div>
        <div className="container">
          <div>
            <img src={img} style={{ maxWidth: "100%" }} />
          </div>

          <div>
            <li style={{ color: "white" }}>
              <a target="_blank" href={link}>
                サイトへ
              </a>
            </li>
            <li style={{ color: "white" }}>{period}</li>
            <li style={{ color: "white" }}>{streetAdress}</li>
            <li style={{ color: "white" }}>{tagList}</li>
            <li style={{ color: "white" }}>{contents}</li>
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 30% 60% 10%;
        }
      `}</style>
    </>
  );
}
