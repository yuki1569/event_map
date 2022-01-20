import { List } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const Marker = (props: any) => {
  const { color, name, id } = props;

  return (
    <>
      <div
        // className={addClass ? 'marker' : 'red'}
        className="marker"
        style={{ backgroundColor: props.isSelected ? "red" : "blue" }}
        id={id}
        onClick={() => {
          props.setIsOpenBottom(true);
          props.setZoom(15);
          props.setImg(props.item.thumbnail);
          props.setCenter({
            lat: Number(props.item.longitudeLatitude[0]) - 0.005,
            lng: Number(props.item.longitudeLatitude[1]),
          });
          props.setContents(props.item.contents);
          props.setLink(props.item.link);
          props.setPeriod(props.item.period);
          props.setStreetAddress(props.item.streetAddress);
          props.setTagList(props.item.tagList);
          props.markerSelect(props.id);
        }}
      ></div>

      <style jsx>{`
        .marker {
          background-color: blue;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 18px;
          border: 2px solid #fff;
          border-radius: 100%;
          user-select: none;
          transform: translate(-50%, -50%);
        }
        .red {
          background-color: red;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 18px;
          border: 2px solid #fff;
          border-radius: 100%;
          user-select: none;
          transform: translate(-50%, -50%);
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
