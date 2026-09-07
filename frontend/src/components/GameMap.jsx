import { useMemo } from "react";


function GameMap({noOfColumns,noOfRows,widthOfBox,heightOfBox}) {

  const boxstyle = useMemo(() => ({
    width: widthOfBox + "px",
    height: heightOfBox + "px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: "#17221b",

    border: "1px solid #304739",

    userSelect: "none"

  }), []);

  const boxes = useMemo(() => {

    return Array.from({
      length: noOfColumns * noOfRows
    }).map((_, index) => (

      <div
        key={index}
        style={boxstyle}
        className="boxes"
      >
      </div>

    ));

  }, []);

  return boxes;
}

export default GameMap;