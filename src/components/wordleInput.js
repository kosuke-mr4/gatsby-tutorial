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
`;

const ColoredBox = styled.div`
  width: 4rem;
  height: 4rem;
  background: green;
  border-radius: 1rem;
  margin-right: 0.5rem;
`;

const WordleInput = () => {
  const [greenState, setGreenState] = useState([]);
  const [yellowState, setYellowState] = useState([]);
  const [grayState, setGrayState] = useState([]);

  return (
    <>
      <LetterArray length={5} />
      <LetterArray length={5} />
      <LetterArray length={10} />
    </>
  );
};

const LetterArray = (props) => {
  console.log(props);
  return (
    <div style={{ display: "flex" }}>
      <ColoredBox />
      <Wrapper>
        {[...Array(props.length)].map((_, index) => (
          <div key={index}>
            <Label>
              <Input></Input>
            </Label>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default WordleInput;
