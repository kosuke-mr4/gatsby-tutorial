import React, { useState, useEffect } from "react";

import { VictoryPie } from "victory";

const graphicColor = ["#388087", "#6fb3b8", "#badfe7", "#ffff00", "#000000"]; // Colors
const wantedGraphicData = [
  { x: "A+", y: 10 },
  { x: "A", y: 50 },
  { x: "B", y: 40 },
  { x: "C", y: 40 },
  { x: "D", y: 4 },
];
// Data that we want to display
// todo : get from csv

const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }]; // last element is 100%

function Chart() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <VictoryPie
      animate={{ easing: "exp" }}
      data={graphicData}
      width={250}
      height={250}
      colorScale={graphicColor}
      innerRadius={50}
    />
  );
}

export default Chart;
