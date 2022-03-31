import React, { useState } from "react";
import styled from "styled-components";

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
  background-color: ${(props) => props.color};
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
  const defaultState = [
    { index: 0, isValid: false, value: "" },
    { index: 1, isValid: false, value: "" },
    { index: 2, isValid: false, value: "" },
    { index: 3, isValid: false, value: "" },
    { index: 4, isValid: false, value: "" },
  ];

  const [greenState, setGreenState] = useState(defaultState);
  const [yellowState, setYellowState] = useState(defaultState);
  const [grayState, setGrayState] = useState(defaultState);

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

      {/* button の onclickが効かねえ？なんで */}
      <SearchButton
        type="button"
        onClick={log(greenState, yellowState, grayState)}
      >
        hohohoo
      </SearchButton>
    </>
  );
};

function log(gre, ye, gray) {
  console.log(gre, ye, gray);
}

const onChange = (event, indexKey, setColorState) => {
  console.log(event.target.value);
  setColorState((prevState) => {
    prevState[indexKey].value = event.target.value;
    prevState[indexKey].isValid = event.target.value !== "" ? true : false;
    console.log(prevState);
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

// const ButtonComponent = (greenState, yellowState, grayState) => {
//   return (
//     <SearchButton
//       type="button"
//       onClick={console.log(greenState, yellowState, grayState)}
//     >
//       gogogoogogogogog
//     </SearchButton>
//   );
// };

export default WordleInput;
