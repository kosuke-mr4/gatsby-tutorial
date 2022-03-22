import React, { useState } from "react";
import styled from "styled-components";
import { parse } from "papaparse";
import Chart from "../components/piChart";

const Wrapper = styled.div`
  padding: 70px 20px;
  text-align: center;
`;
const Label = styled.label`
  padding: 0.6em 1em;
  font-size: 1em;
  background-color: #1aa1ff;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
`;
const Input = styled.input`
  display: none;
`;
const FileName = styled.p`
  color: #1aa1ff;
`;

const IsExistDataState = styled.div`
  text-align: center;
`;

// let scoreData = [];

// let eachDataOfScores = {
//   "A+": [],
//   A: [],
//   B: [],
//   C: [],
//   D: [],
// };

const parseFIle = (data) => {
  return new Promise((resolve, reject) => {
    parse(data, {
      header: true,
      complete(results, data) {
        resolve(results.data);
      },
      error(err, data) {
        reject(err);
      },
    });
  });
};

const dispData = async (data) => {
  let APt = 0;
  let At = 0;
  let Bt = 0;
  let Ct = 0;
  let Dt = 0;
  let Pt = 0;
  let Ft = 0;

  const subjectsNumber = "科目番号";
  const subjectsName = "科目名";
  const creditNumber = "単位数";
  const totalEvaluation = "総合評価";

  const parsedData = await parseFIle(data);

  parsedData.forEach((element) => {
    switch (element[totalEvaluation]) {
      case "A+":
        APt += parseFloat(element[creditNumber]);
        break;
      case "A":
        At += parseFloat(element[creditNumber]);
        break;
      case "B":
        Bt += parseFloat(element[creditNumber]);
        break;
      case "C":
        Ct += parseFloat(element[creditNumber]);
        break;
      case "D":
        Dt += parseFloat(element[creditNumber]);
        break;
      case "P":
        Pt += parseFloat(element[creditNumber]);
        break;
      case "F":
        Ft += parseFloat(element[creditNumber]);
        break;
      default:
      // pass
    }
  });
  console.log(APt, At, Bt, Ct, Dt, Pt, Ft);
};

const onChange = (event, cb, setFileName) => {
  cb(event);
  const targetName = event.target.files.item(0).name;
  dispData(event.target.files[0]);
  setFileName(targetName);
};

const InputFile = (props) => {
  const [filename, setFileName] = useState("選択されていません");
  const [isExistFile, setIsExistFile] = useState(false);

  const defaultAp = "#000000";
  const defaultA = "#696969";
  const defaultB = "#808080";
  const defaultC = "#a9a9a9";
  const defaultD = "#c0c0c0";

  const validAp = "#388087";
  const validA = "#6fb3b8";
  const validB = "#badfe7";
  const validC = "#ffff00";
  const validD = "#8b4513";

  const defaultGraphicColor = [
    defaultAp,
    defaultA,
    defaultB,
    defaultC,
    defaultD,
  ];

  const validGraphicColor = [validAp, validA, validB, validC, validD];

  const [graphicColor, setGraphicColor] = useState(defaultGraphicColor);

  const defaultGraphicData = [
    { x: "A+", y: 10 },
    { x: "A", y: 10 },
    { x: "B", y: 10 },
    { x: "C", y: 10 },
    { x: "D", y: 10 },
  ];

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  if (props.type !== "file") return <p>typeの指定が間違ってる</p>;
  return (
    <>
      <div>twinsからダウンロードしたcsvファイルを読み込みます</div>
      <Wrapper>
        <Label>
          csvファイルを選択
          <Input
            {...props}
            accept=".csv"
            onChange={(e) => onChange(e, props.onChange, setFileName)}
          />
        </Label>
        <FileName>{filename}</FileName>
      </Wrapper>
      <IsExistDataState>{isExistFile ? "aruyo" : "naiyo"}</IsExistDataState>
      <Chart graphicColor={graphicColor} graphicData={graphicData} />
    </>
  );
};

export default InputFile;
