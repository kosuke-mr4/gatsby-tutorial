import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import dayjs from "dayjs";
import styled from "styled-components";

import { VictoryPie, VictoryLabel } from "victory";

const LoggerButton = styled.button`
  text-align: center;
`;

const LeftTimeText = styled.div`
  text-align: center;
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

const Notimer = () => {
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
      {/* <LoggerButton onClick={() => Start(setSavedDate, setPassedMinute)}>
        start
      </LoggerButton> */}
    </>
  );
};

const TimeOver = () => {
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
    </>
  );
};

const HandleTimer = (props) => {
  /* 
  savedDateがnull => timerは存在しません
  savedDateが非null && passedが60未満 => その分時間が経過したタイマー
  savedDateが非null && passedが60以上 => timeup画面
  */
  if (props.savedDate == null) {
    return (
      <>
        <Notimer></Notimer>
        <LeftTimeText>No timer set</LeftTimeText>
      </>
    );
  } else {
    if (props.passedMinute < 60) {
      return (
        <>
          <VictoryPie
            startAngle={6 * props.passedMinute}
            data={[{ x: " ", y: 360 }]}
          />
          <LeftTimeText>{60 - props.passedMinute} minutes left</LeftTimeText>
        </>
      );
    } else {
      return (
        <>
          <TimeOver></TimeOver>
          <LeftTimeText>One hour passed</LeftTimeText>
        </>
      );
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
        <HandleTimer passedMinute={passedMinute} savedDate={savedDate} />

        {/* <LoggerButton onClick={() => SetDiff(savedDate, setPassedMinute)}>
          logger
        </LoggerButton>

        <LoggerButton
          onClick={() =>
            console.log("savedDate : ", savedDate, "\n sub : ", passedMinute)
          }
        >
          state logger
        </LoggerButton> */}

        {/* stateを書き換える処理を追記する */}
        <LoggerButton
          onClick={() => (localStorage.removeItem("date"), setSavedDate(null))}
        >
          delete localStorage
        </LoggerButton>

        <LoggerButton onClick={() => Start(setSavedDate, setPassedMinute)}>
          start
        </LoggerButton>
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
