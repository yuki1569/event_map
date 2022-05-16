import React from "react";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function ToggleButtons(props) {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div style={{ marginTop: "", display: "inline-block" }}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <div style={{ borderRadius: "4px" }}>
          <ToggleButton
            value="left"
            aria-label="left aligned"
            onClick={() => {
              props.sortDateAscendingOrder();
            }}
          >
            終了が早い順
            {/* <FormatAlignLeftIcon /> */}
          </ToggleButton>
        </div>

        <div style={{ borderRadius: "4px" }}>
          <ToggleButton
            value="center"
            aria-label="centered"
            onClick={() => {
              props.sortDateDescendingOrder();
            }}
          >
            終了が遅い順
            {/* <FormatAlignCenterIcon /> */}
          </ToggleButton>
        </div>

        <div style={{ borderRadius: "4px" }}>
          <ToggleButton
            value="right"
            aria-label="right aligned"
            onClick={() => {
              props.sortDistanceAscendingOrder();
            }}
          >
            近い順
            {/* <FormatAlignRightIcon /> */}
          </ToggleButton>
        </div>

        {/* <ToggleButton value="justify" aria-label="centered"
      onClick={() => {
        props.sortDistanceDescendingOrder()
      }}>
        <FormatAlignJustifyIcon />
      </ToggleButton> */}
      </ToggleButtonGroup>
    </div>
  );
}
