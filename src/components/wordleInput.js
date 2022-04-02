import React, { useState } from "react";
import styled from "styled-components";
import { WORDS } from "../configs/words.js";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 85%;
  padding-bottom: 20px;
`;
const Label = styled.label`
  padding: 0.1em;
  cursor: pointer;
`;
const Input = styled.input.attrs({
  type: "text",
  maxLength: "1",
})`
  border: 5px solid #000;
  border-radius: 2px;
  color: #000000;
  font-size: 4rem;
  width: 4.1rem;
  margin: 0px;
  text-align: center;
  border-radius: 10px;
  //background-color: ${(props) => props.color};
`;

const ColoredBox = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
  margin-right: 0.5rem;
`;

const SearchButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const WordleInput = () => {
  const defaultGreenState = [...Array(5)].map((_, ind) => ({
    index: ind,
    isValid: false,
    value: "",
  }));
  const defaultYellowState = [...Array(5)].map((_, ind) => ({
    index: ind,
    isValid: false,
    value: "",
  }));
  const defaultGrayState = [...Array(15)].map((_, ind) => ({
    index: ind,
    isValid: false,
    value: "",
  }));

  const [greenState, setGreenState] = useState(defaultGreenState);
  const [yellowState, setYellowState] = useState(defaultYellowState);
  const [grayState, setGrayState] = useState(defaultGrayState);

  return (
    <>
      <LetterArray
        length={5}
        color={"green"}
        colorState={greenState}
        setColorState={setGreenState}
      />
      <LetterArray
        length={5}
        color={"yellow"}
        colorState={yellowState}
        setColorState={setYellowState}
      />
      <LetterArray
        length={15}
        color={"gray"}
        colorState={grayState}
        setColorState={setGrayState}
      />

      <SearchButton
        type="button"
        onClick={() =>
          makeRegularExpression(greenState, yellowState, grayState)
        }
        //onClick={() => log(greenState, yellowState, grayState)}
      >
        hohohoo
      </SearchButton>
    </>
  );
};

// 考えること

// 入力受け取って状態が変わったことを検知して検索結果を表示する
// 入力があるかないかで ? null : <Answer /> みたいな？

// 候補をstateとして持ちたい

// function log(gre, ye, gray) {
//   console.log(gre, ye, gray);
// }

function makeRegularExpression(green, yellow, gray) {
  //  console.log(arr);
  const greenResult = checkGreenWords(green, WORDS);
  //console.log(greenResult);
  const yellowResult = checkYellowWords(yellow, greenResult);
  //console.log(yellowResult);
  const grayResult = checkGrayWords(gray, yellowResult);
  //console.log(grayResult);
  return grayResult;
}

function checkGreenWords(greenArray, WORDS) {
  let regExpText = "";
  greenArray.forEach((el) => {
    const isDotOrCharacter = el.isValid ? el.value : ".";
    regExpText += isDotOrCharacter;
  });

  const reg = RegExp("^" + regExpText + "$");
  // console.log(reg);

  const res = WORDS.filter(RegExp.prototype.test, reg);
  // console.log(res);
  return res;
}

function checkYellowWords(yellowArray, WORDS) {
  let regExpNotContainedParticularPoint = "";
  yellowArray.forEach((el) => {
    const isContained = el.isValid ? el.value : ".";
    // (?=.*l)
    regExpNotContainedParticularPoint += el.isValid ? `(?=.*${el.value})` : "";
  });
  const reg1 = RegExp("^" + regExpNotContainedParticularPoint);
  // console.log(reg1);
  const res1 = WORDS.filter(RegExp.prototype.test, reg1);
  // console.log(res1);

  let isDifferentParticularCharacter = Array(5).fill(".");
  yellowArray.forEach((el) => {
    if (el.isValid) {
      //[^p]
      isDifferentParticularCharacter[el.index] = `[^${el.value}]`;
    }
  });
  const reg2 = RegExp("^" + isDifferentParticularCharacter.join(""));
  // console.log(reg2);
  const res2 = res1.filter(RegExp.prototype.test, reg2);
  // console.log(res2);

  return res2;
}

function checkGrayWords(grayArray, WORDS) {
  let regExpNotContained = [];
  grayArray.forEach((el) => {
    if (el.isValid) {
      regExpNotContained.push(el.value);
    }
  });
  //^(?!.*a|b).*$
  const reg = RegExp("^(?!.*(" + regExpNotContained.join("|") + ")).+$");
  //   console.log(reg);

  const res = WORDS.filter(RegExp.prototype.test, reg);
  //console.log(res);
  return res;
}

const onChange = (event, indexKey, setColorState) => {
  console.log(event.target.value);
  setColorState((prevState) => {
    prevState[indexKey].value = event.target.value;
    prevState[indexKey].isValid = event.target.value !== "" ? true : false;
    // console.log(prevState);
    return prevState;
  });
};

const LetterArray = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <ColoredBox color={props.color} />
      <Wrapper>
        {[...Array(props.length)].map((_, index) => (
          <div key={index}>
            <Label>
              <Input
                {...props}
                onChange={(e) => onChange(e, index, props.setColorState)}
                color={props.color}
              />
            </Label>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default WordleInput;
