// import React, { useState, useEffect, useRef } from "react";

// // import "./App.css";

// /* エラーテキスト */
// const ErrorText = () => (
//   <p className="App-error-text">geolocation IS NOT available</p>
// );

// export default function GetCurrentPosition()  {
//   const [isAvailable, setAvailable] = useState(false);
//    const [position, setPosition] = useState({ latitude: null, longitude: null });

//   // useEffectが実行されているかどうかを判定するために用意しています
//   const isFirstRef = useRef(true);

//   /*
//    * ページ描画時にGeolocation APIが使えるかどうかをチェックしています
//    * もし使えなければその旨のエラーメッセージを表示させます
//    */
//   useEffect(() => {
//     isFirstRef.current = false;
//     if ("geolocation" in navigator) {
//       setAvailable(true);
//     }
//   }, [isAvailable]);

//   let latitude=0
//   let longitude=0
//   async function  getCurrentPosition ()  {
//     await navigator.geolocation.getCurrentPosition((position) => {
//      latitude  = position.coords.latitude;
//      longitude = position.coords.longitude;
//       // const { latitude, longitude } =  position.coords;
//       // setPosition({ latitude, longitude });
//       // console.log(position.coords);
//       // console.log(latitude);
//       return latitude
//     });
//   };

//   // useEffect実行前であれば、"Loading..."という呼び出しを表示させます
//   if (isFirstRef.current) return <div className="App">Loading...</div>;

//   return (
//      getCurrentPosition()
   
//   )
// };
