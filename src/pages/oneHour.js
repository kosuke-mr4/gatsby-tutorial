import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import dayjs from "dayjs";
import styled from "styled-components";

import { VictoryPie, VictoryLabel } from "victory";

const LoggerButton = styled.button`
  display: block;
  text-align: center;
  background-color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 10px;
  width: 30%;
  margin: 0 auto;
`;

const Outer = styled.div`
  display: block;
  padding: 1em 0em;
  text-align: center;
`;

const LeftTimeText = styled.div`
  text-align: center;
`;

const Input = styled.textarea`
  padding: 0.5em;
  resize: none;
  /* color: palevioletred;
  background: papayawhip; */
  width: 60%;
  height: 4rem;
  border-radius: 10px;
  border: 2px solid;
`;

const useIntervalBy60s = (callback) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback; // 新しいcallbackをrefに格納！
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    const id = setInterval(tick, 60000);
    return () => {
      clearInterval(id);
    };
  }, []); //refはミュータブルなので依存配列に含めなくてもよい
};

const Notimer = ({ setSavedDate, setPassedMinute }) => {
  return (
    <>
      <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          innerRadius={140}
          data={[{ x: " ", y: 360 }]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 100 }}
          x={200}
          y={200}
          text="⛔"
        />
      </svg>
      <LeftTimeText>No timer set</LeftTimeText>
      <Outer>
        <LoggerButton onClick={() => Start(setSavedDate, setPassedMinute)}>
          start
        </LoggerButton>
      </Outer>
    </>
  );
};

// https://twitter.com/intent/tweet/?text=${shareText}&url=${url}
// https://twitter.com/intent/tweet/?text=ウンコ&url=localhost

// wip : add break

const echo = (value) => {
  console.log(value);
  const firstText = "1時間で";
  const secondText = value;
  const thirdText = "をしました";

  const textArray = [firstText, secondText, thirdText];
  const tweetText = textArray.join("\n");
  return tweetText;
};

const TweetContent = () => {
  const textRef = useRef("");
  let url = `https://twitter.com/intent/tweet/?text=${echo(
    textRef.current.value
  )}&url=${window.location.href}`;
  return (
    <>
      <Outer>
        <Input ref={textRef} placeholder="1時間で何した？" />
      </Outer>
      <Outer>
        <LoggerButton onClick={() => alert(textRef.current.value)}>
          tweetTEST
        </LoggerButton>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Tweet
        </a>
      </Outer>
    </>
  );
};

const TimeOver = ({ setSavedDate }) => {
  return (
    <>
      <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          innerRadius={140}
          data={[{ x: " ", y: 360 }]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 100 }}
          x={200}
          y={200}
          text="🔄"
        />
      </svg>

      <LeftTimeText>One hour passed</LeftTimeText>

      <TweetContent></TweetContent>

      <Outer>
        <LoggerButton
          onClick={() => (localStorage.removeItem("date"), setSavedDate(null))}
        >
          Reset
        </LoggerButton>
      </Outer>
    </>
  );
};

const ProgressTimer = ({ passedMinute, setSavedDate }) => {
  return (
    <>
      <VictoryPie startAngle={6 * passedMinute} data={[{ x: " ", y: 360 }]} />
      <LeftTimeText>{60 - passedMinute} minutes left</LeftTimeText>
      <Outer>
        <LoggerButton
          onClick={() => (localStorage.removeItem("date"), setSavedDate(null))}
        >
          Reset
        </LoggerButton>
      </Outer>
    </>
  );
};

const HandleTimer = (props) => {
  if (props.savedDate == null) {
    return (
      <Notimer
        setSavedDate={props.setSavedDate}
        setPassedMinute={props.setPassedMinute}
      />
    );
  } else {
    if (props.passedMinute < 60) {
      return (
        <ProgressTimer
          passedMinute={props.passedMinute}
          setSavedDate={props.setSavedDate}
        />
      );
    } else {
      return <TimeOver setSavedDate={props.setSavedDate} />;
    }
  }
};

const OneHourPage = () => {
  const [savedDate, setSavedDate] = useState("");
  const [passedMinute, setPassedMinute] = useState(0);

  // localstrageに時間があった場合実行中とみなす、終了時のResetボタンでのみ終了を受容するようにする

  useEffect(() => {
    let localDate = localStorage.getItem("date");

    if (localDate == null) {
      console.log("null local data");
    } else {
      console.log("already exist");
      console.log(localDate);
      setSavedDate(localDate);
      SetDiff(savedDate, setPassedMinute);
    }
  });

  // 60秒ごとにPassedMinuteを更新
  useIntervalBy60s(() => SetDiff(savedDate, setPassedMinute));

  console.log(passedMinute);

  return (
    <>
      <Layout pageTitle={"one hour timer"}>
        <HandleTimer
          passedMinute={passedMinute}
          savedDate={savedDate}
          setSavedDate={setSavedDate}
          setPassedMinute={setPassedMinute}
        />

        {/* <LoggerButton
          onClick={() => (localStorage.removeItem("date"), setSavedDate(null))}
        >
          Reset button
        </LoggerButton>

        <LoggerButton onClick={() => Start(setSavedDate, setPassedMinute)}>
          start
        </LoggerButton> */}
      </Layout>
    </>
  );
};

const Start = (setSavedDate, setPassedMinute) => {
  const startDate = dayjs().format();
  localStorage.setItem("date", startDate);
  setSavedDate(startDate);
  console.log("set!");
  InitDiff(setPassedMinute);
};

const InitDiff = (setPassedMinute) => {
  setPassedMinute(0);
};

const SetDiff = (savedDate, setPassedMinute) => {
  const savedDateObj = dayjs(savedDate);
  const currentDateObj = dayjs();

  const passed = currentDateObj.diff(savedDateObj, "minute");

  if (passed) {
    console.log("setdiff", passed);
    setPassedMinute(passed);
  }
};

export default OneHourPage;
