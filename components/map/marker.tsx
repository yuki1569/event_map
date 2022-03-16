import { List } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const Marker = (props: any) => {
  const { color, name, id } = props;
  const zoom = props.zoom;

  // function hoiceEventItemSetMarkerPosition(v, z) {
  //   const Z = z;
  //   const a = { zoom: 13 };
  //   if (Z.zoom === a.zoom) {
  //   } else {
  //   }

  //   switch (z.zoom) {
  //     case 10 || zoom > 10:
  //       return { lat: v.lat - 0.23, lng: v.lng };
  //       break;
  //     case 11:
  //       return { lat: 1, lng: 1 };
  //       break;
  //     case 12:
  //       return { lat: v.lat - 0.048, lng: v.lng };
  //       break;
  //     case 13:
  //       return { lat: v.lat - 0.025, lng: v.lng };
  //       break;
  //     case 14:
  //       return { lat: v.lat - 0.012, lng: v.lng };
  //       break;
  //     case 15:
  //       return { lat: v.lat - 0.0062, lng: v.lng };
  //       break;
  //     case 16 || zoom > 10:
  //       return { lat: v.lat - 0.0032, lng: v.lng };
  //       break;
  //     default:
  //       break;
  //   }
  // }
  return (
    <>
      <div
        // className={addClass ? 'marker' : 'red'}
        className="marker"
        style={{ backgroundColor: props.isSelected ? "red" : "blue" }}
        id={id}
        onClick={() => {
          props.setmapHeight("60%");
          props.setIsOpenBottom(true);
          // props.setZoom(15);
          props.choiceEventItemSetMarkerPosition(
            {
              lat: Number(props.item.longitudeLatitude[0]),
              lng: Number(props.item.longitudeLatitude[1]),
            },
            props.zoom
          );
          // props.setCenter({
          //   lat: Number(props.item.longitudeLatitude[0]),
          //   lng: Number(props.item.longitudeLatitude[1]),
          // });
          // props.setCenter(
          //   hoiceEventItemSetMarkerPosition(
          //     {
          //       lat: Number(props.item.longitudeLatitude[0]),
          //       lng: Number(props.item.longitudeLatitude[1]),
          //     },
          //     zoom
          //   )
          // );
          props.setImg(props.item.thumbnail);
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
