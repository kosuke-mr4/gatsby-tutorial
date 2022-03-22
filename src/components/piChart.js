import React, { useState, useEffect } from "react";

import { VictoryPie, VictoryTooltip, VictoryLabel } from "victory";

const validAp = "#388087";
const validA = "#6fb3b8";
const validB = "#badfe7";
const validC = "#ffff00";
const validD = "#8b4513";

const validGraphicColor = [validAp, validA, validB, validC, validD];

// const validGraphicColor = [validAp, validA, validB, validC, validD];

// const wantedGraphicData = [
//   { x: "A+", y: 10 },
//   { x: "A", y: 10 },
//   { x: "B", y: 10 },
//   { x: "C", y: 10 },
//   { x: "D", y: 10 },
// ];

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
        flyoutStyle={{ fill: validGraphicColor[prop.index] }}
      />
    </g>
  );
};

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

const Chart = (props) => {
  // const [graphicData, setGraphicData] = useState(
  //   props.graphicData == defaultGraphicData
  //     ? defaultGraphicData
  //     : props.graphicData
  // );

  // useEffect(() => {
  //   setGraphicData(props.graphicData); // Setting the data that we want to display
  //   console.log(props.graphicData);
  // }, []);

  return (
    <>
      <VictoryPie
        animate={{ easing: "exp" }}
        data={props.graphicData}
        // width={250}
        // height={250}
        colorScale={props.graphicColor}
        innerRadius={100}
        labelComponent={<CustomLabel />}
      />
    </>
  );
};

export default Chart;
