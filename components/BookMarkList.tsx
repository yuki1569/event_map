import Modal from 'react-modal'
import ModalEventListDetails from './ModalEventListDetails'
import { useState,useEffect } from "react";
import { auth, fireStoreDB, firebaseUser,bookMarkQuery,Firebase} from '../src/firebase';
import { eventDB } from '../lib/db'

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

  function toggle(bool) {
    if (bool) {
      return 'none'
    } else {
      return ''
    }
  }

export default function BookMarkList({ bookMarkListUpDate }
  // { modalIsOpenBookMark, setIsOpenBookMark }
    // : {
    // modalIsOpenBookMark: boolean;
    // setIsOpenBookMark: any;
    // }
)
{
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const [img, setImg] = useState('');
  const [contents, setContents] = useState('');

  const [loading, setLoading] = useState(true);
  const [bookMark, setBookMark] = useState([]);
  const [listUpDate, setListUpDate] = useState(true);
  
  useEffect(() => {
    const searchBookMark = async() => {
      // Firestoreのコレクションを指定してデータ取得。今回は全量を検索
      const res = await fireStoreDB.collection('bookMark').get();
      if (res.empty) return [];
      const BookMarkList = [];
      // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
      res.forEach(doc => {
          BookMarkList.push(doc.data());
      })
      
      setBookMark(BookMarkList);
    }

    searchBookMark();
    setLoading(true);
}, [listUpDate]);

    return bookMark
          {
            // auth.currentUser
            //   ? bookMark.map((value, index) => {
            //       if (value.uid === firebaseUser().uid) {
            //         return (
            //           <div
            //             key={index}
            //             onClick={() => {
            //               setIsOpenDetails(true);
            //               setImg(value.thumbnail);
            //               setContents(value.contents);
            //             }}
            //             style={{
            //               margin: '10px',
            //               flexGrow: 1,
            //               width: '30vh'
            //             }}>
                                  
            //             <li style={{ color: 'white' }} >{value.title}</li>
            //             {/* <button>💛</button> */}
            //             <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
            //           </div>
            //         )
            //       } else {
            //         return (
            //           <div></div>
            //         )
            //       }
            //     })
            //   : <div>n</div>
          }
          {
            // auth.currentUser
            //   ? async function () {
            //     const fireStoredb = await fireStoreDB.collection('bookMark').get();
            //     const query = [];

            //     await fireStoredb.docs.map((doc) => {
            //       query.push(doc.data())
            //     });
            //     console.log(query);
            //     await query.map((value, index) => {
                     
            //       if (value.uid === firebaseUser().uid) {
            //         return (
            //           <div
            //             key={index}
            //             onClick={() => {
            //               setIsOpenDetails(true);
            //               setImg(value.thumbnail);
            //               setContents(value.contents);
            //             }}
            //             style={{
            //               margin: '10px',
            //               flexGrow: 1,
            //               width: '30vh'
            //             }}>
                                  
            //             <li style={{ color: 'white' }} >{value.title}</li>
            //             {/* <button>💛</button> */}
            //             <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
            //           </div>
            //         )
            //       } else {
            //         return (
            //           <div></div>
            //         )
            //       }
            //     });
            //   }
            //   : <div>n</div>
          }

    
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


