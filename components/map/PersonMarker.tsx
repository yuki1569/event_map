import { List } from "@material-ui/core";
import React from "react";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AdjustIcon from "@material-ui/icons/Adjust";

const PersonMarker = (props: any) => {
  const { color, name, id } = props;
  // console.log(props.item)
  return (
    <>
      <>
        <div className="marker" id={id}></div>

        <style jsx>{`
          .marker {
            background-color: black;
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
      </>
    </>
  );
};

export default PersonMarker;
