import { List } from '@material-ui/core';
import React from 'react';

const Marker = (props: any) => {
  const { color, name, id } = props;
  // console.log(props.item)
  return (
      <>
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
        onClick={() => {
          props.setIsOpenBottom(true);
          props.setZoom(15)
          props.setImg(props.item.thumbnail)
          props.setCenter({ lat: Number(props.item.longitudeLatitude[0])-0.005, lng: Number(props.item.longitudeLatitude[1]) })
          props.setContents(props.item.contents)
          props.setLink(props.item.link)
          props.setPeriod(props.item.period)
          props.setStreetAddress(props.item.streetAddress)
          props.setTagList(props.item.tagList)
        }
        }
      >
        </div>
      
      <style jsx>{`
        .marker {

          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 18px;
          background-color: #000;
          border: 2px solid #fff;
          border-radius: 100%;
          user-select: none;
          transform: translate(-50%, -50%);
          /* &:hover {
              z-index: 1;
            } */
        }
      `}</style>

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
  
  export default Marker;