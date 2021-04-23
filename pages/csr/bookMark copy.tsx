import Modal from 'react-modal'
import ModalEventListDetails from '../../components/ModalEventListDetails'
import { useState } from "react";
import { auth, fireStoreDB, firebaseUser,bookMarkQuery } from '../../src/firebase';
import { eventDB } from '../../lib/db'

const customStyles = {
  overlay: {
    position: "fixed",
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    scrollBars: 'red',
    zIndex: 5,
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

export default function ModalEventListBookMark({ modalIsOpenBookMark, setIsOpenBookMark }
    // : {
    // modalIsOpenBookMark: boolean;
    // setIsOpenBookMark: any;
    // }
)
{
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');

    return (
      < >
         {/* <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} /> */}
        
        <Modal
          // isOpenがtrueならモダールが起動する※Modalのプロパティ
          isOpen={true}
          // モーダルが開いた後の処理を定義
          // onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          // onRequestClose={() => setIsOpenBookMark(false)}
          // スタイリングを定義
          style={customStyles}
        >
          {
            auth.currentUser
              ? async function () {
                const fireStoredb = await fireStoreDB.collection('bookMark').get();
                const query = [];

                await fireStoredb.docs.map((doc) => {
                  query.push(doc.data())
                });
                console.log(query);
                await query.map((value, index) => {
                     
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
                      <div></div>
                    )
                  }
                });
              }
              : <div>n</div>
          }
        </Modal>

      </>
    )
}




// export default function index({ posts }) {
//   return (
//     <div>
//       <h1>POST一覧</h1>
//       <ul>
//         {posts.map((post) => {
//           return <li key={post.id}>{post.title}</li>;
//         })}
//       </ul>
//     </div>
//   );
// }


// export async function getServerSideProps() {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const posts = await res.json();
//   console.log(posts);
//   return { props: { posts } };
// }


