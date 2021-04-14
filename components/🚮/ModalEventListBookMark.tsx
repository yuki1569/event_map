// import Modal from 'react-modal'
// import ModalEventListDetails from './ModalEventListDetails'
// import { useState } from "react";
// import { auth, fireStoreDB, firebaseUser,bookMarkQuery } from '../src/firebase';
// import { eventDB } from '../lib/db'
// // import Details from './ModalEventListBookMark'


// const customStyles = {
//   overlay: {
//     position: "fixed",
//     left: 0,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     scrollBars: 'red',
//     zIndex: 10,
//     // overflowY: "scroll",
//   },

//   content: {
//     backgroundColor: "rgba(0,0,0,0)",
//     border: 'hidden',
//     listStyle:'none',
//     display: 'flex',
//     flexWrap: 'wrap',
//     marginTop:'25px' ,
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     width                 : '87%',
//     height                : '82%',
//     transform: 'translate(-50%, -50%)',
    
//   }
// };

// // // アプリのルートを識別するクエリセレクタを指定する。
// Modal.setAppElement('#__next')


// export default function Details({ query }){
//   console.log(query)
//     return (
//       < div> 
//           {
//             auth.currentUser
//               ?
//             query.map((value, index) => {
//                   return(
//                   <div
//                     key={index}
//                     onClick={() => {
//                       // setIsOpenDetails(true);
//                       // setImg(value.thumbnail);
//                       // setContents(value.contents);
//                     }}
//                     style={{ margin: '10px', flexGrow: '1', width: '30vh' }}>
//                     <li style={{ color: 'white' }} >{value.title}</li>
//                     {/* <button>💛</button> */}
//                     <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
//                 </div>
//                   )
//                 })
//               : <div>
//               ログインしてください
//               </div>
//         }
//         </div>
//     )
// }

// export async function getServerSideProps() {
//   const fireStoredb = await fireStoreDB.collection('bookMark').get();
//   const query = []
  
//   await fireStoredb.docs.map((doc) => {
//       query.push(doc.data())
//     });
//   return { props: { query } };
  
// }

// export  function ModalEventListBookMark({ modalIsOpenBookMark, setIsOpenBookMark}){
//   const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
//   const [img, setImg] = useState('');
//   const [contents, setContents] = useState('');
//   const test = Details
//     return (
//       < >
//         <ModalEventListDetails modalIsOpenDetails={modalIsOpenDetails} setIsOpenDetails={setIsOpenDetails} img={img} contents={contents} />
        
//         <Modal
//           // isOpenがtrueならモダールが起動する※Modalのプロパティ
//           isOpen={modalIsOpenBookMark}
//           // モーダルが開いた後の処理を定義
//           // onAfterOpen={afterOpenModal}
//           // モーダルを閉じる処理を定義
//           onRequestClose={() => setIsOpenBookMark(false)}
//           // スタイリングを定義
//           style={customStyles}
//         >
          
//           <div>{test}</div>
//           {/* {
//             auth.currentUser
//               ?
//                 query.map((value, index) => {
//                   <div
//                     key={index}
//                     onClick={() => {
//                       setIsOpenDetails(true);
//                       setImg(value.thumbnail);
//                       setContents(value.contents);
//                     }}
//                     style={{ margin: '10px', flexGrow: '1', width: '30vh' }}>
//                     <li style={{ color: 'white' }} >{value.title}</li>
//                     {/* <button>💛</button>
//                     <img src={value.thumbnail} style={{ width: '100%', maxWidth: '450px' }} />
//                   </div>
//                 })
//               : <div>
//                 ログインしてください
//               </div>
//           }*/}
          
//         </Modal>

//       </>
//     )
// }





