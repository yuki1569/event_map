import React, { useReducer, useContext } from 'react';
import { eventDB } from '../../lib/db'
import { auth, fireStoreDB, firebaseUser,bookMarkQuery } from '../../src/firebase';

export default function Counter({eventListDbQuery}) {
  return (
    <div>
      <h1>Counter{ eventListDbQuery}</h1>
    </div>
  );
}

export async function getStaticProps() {
  const fireStoredb = await fireStoreDB.collection('bookMark').get();
  const query = []
  const eventListDbQuery = []
  //ログイン中のユーザーのブックマークリストのイベントIDを配列queryに代入
  fireStoredb.docs.map((doc) => {
      // doc.data().uid === firebaseUser().uid
      //   ? query.push(doc.data().id)
      //   : ''
        query.push(doc.data().id)
    });
  
    await query.map(que =>
      eventListDbQuery.push(
        eventDB.filter((db) => {
        return db.id == que
        })
      )
    );

      return {
    props: {
        eventListDbQuery
    },
  };
  console.log(eventListDbQuery);
}



