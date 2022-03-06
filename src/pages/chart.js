import React, { useState, useEffect } from "react";

import { VictoryPie, VictoryTooltip, VictoryLabel } from "victory";

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

const CustomLabel = (prop) => {
  return (
    <g>
      <VictoryLabel {...prop} />
      <VictoryTooltip
        {...prop}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: graphicColor[prop.index] }}
      />
    </g>
  );
};

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

const Chart = () => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <VictoryPie
      animate={{ easing: "exp" }}
      data={graphicData}
      // width={250}
      // height={250}
      colorScale={graphicColor}
      innerRadius={100}
      labelComponent={<CustomLabel />}
    />
  );
};

export default Chart;
