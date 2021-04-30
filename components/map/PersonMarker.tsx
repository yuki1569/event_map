import { List } from '@material-ui/core';
import React from 'react';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const PersonMarker = (props: any) => {
  const { color, name, id } = props;
  // console.log(props.item)
  return (
      <>

        <PersonPinIcon/>


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      </>
  );
  
};
  
  export default PersonMarker;