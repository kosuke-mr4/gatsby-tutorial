import React, { useState } from "react";
import styled from "styled-components";
import { parse } from "papaparse";

const Wrapper = styled.div`
  padding: 50px 20px;
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

const dispData = (data) => {
  parse(data, {
    complete: function (results) {
      console.log(results.data);
    },
  });
};

const onChange = (event, cb, setFileName) => {
  cb(event);
  const targetName = event.target.files.item(0).name;
  dispData(event.target.files[0]);
  setFileName(targetName);
};

const InputFile = (props) => {
  const [filename, setFileName] = useState("選択されていません");
  // const [isExistFile, setIsExistFile] = useState(false);
  if (props.type !== "file") return <p>typeの指定、間違ってるよ</p>;
  return (
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
  );
};

export default InputFile;
