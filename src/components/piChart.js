import React from "react";

import { VictoryPie, VictoryTooltip, VictoryLabel } from "victory";

const validAp = "#388087";
const validA = "#6fb3b8";
const validB = "#badfe7";
const validC = "#ffff00";
const validD = "#8b4513";

const validGraphicColor = [validAp, validA, validB, validC, validD];

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
        flyoutStyle={{ fill: "#0000" }}
      />
    </g>
  );
};

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

const Chart = (props) => {
  return (
    <>
      <VictoryPie
        animate={{ easing: "exp" }}
        data={props.graphicData}
        colorScale={props.graphicColor}
        innerRadius={100}
        labelComponent={<CustomLabel />}
      />
    </>
  );
};

export default Chart;
