// import React,{useReducer, useContext} from 'react';
// import AuthContext from "../../src/AuthContext";

// const fookstest = React.useContext(AuthContext);


// const initialState = {
//   count: 0
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     // case 'INCREMENT':
//     //   return { count: state.count + 1 }
//     // case 'DECREMENT':
//     //   return { count: state.count - 1 }
//     case 'DECREMENT':
//       return {count: state.count - action.payload}
//         default:
//       return state
//   }
// }
// // const reducer = (state, action) => {
// //   if (action === 'INCREMENT') {
// //     return {count: state.count +1}
// //   } else {
// //     return {count: state.count -1}
// //   }
// // }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <div>
//       <h1>Counter</h1>
//       <h2>カウント:{ state.count}</h2>
//       {/* <button onClick={() => dispatch('INCREMENT')}>+</button> */}
//       {/* <button onClick={() => dispatch('DECREMENT')}>-</button> */}
//       <button onClick={() => dispatch({ type: 'DECREMENT', payload: 5 })}>-</button>
//       {fookstest}
//     </div>
//   );
// }

// export default Counter;