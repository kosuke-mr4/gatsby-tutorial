import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import dayjs from "dayjs";
import styled from "styled-components";

const LoggerButton = styled.button`
  text-align: center;
`;

const OneHourPage = () => {
  const [savedDate, setSavedDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [passedMinute, setPassedMinute] = useState(0);

  useEffect(() => {
    let localDate = localStorage.getItem("date");
    const startDate = dayjs().format(); // 現在時刻

    if (localDate == null) {
      localStorage.setItem("date", startDate);
      setSavedDate(startDate);
      setCurrentDate(startDate);
    } else {
      console.log(localDate);
      setSavedDate(localDate);
      setCurrentDate(startDate);
      SetDiff(savedDate, currentDate, setPassedMinute);
    }
  });

  // 60秒ごとにcurrentDateをc更新
  // まず円を描画する
  // 円の角度をstate参照でできるようにする

  return (
    <>
      <Layout pageTitle={"one hour timer"}>
        <LoggerButton
          onClick={() => SetDiff(savedDate, currentDate, setPassedMinute)}
        >
          logger
        </LoggerButton>

        <LoggerButton
          onClick={() =>
            console.log(
              "savedDate : ",
              savedDate,
              "\ncurrentDate : ",
              currentDate,
              "\n sub : ",
              passedMinute
            )
          }
        >
          state logger
        </LoggerButton>
      </Layout>
    </>
  );
};

const SetDiff = (savedDate, currentDate, setPassedMinute) => {
  const savedDateObj = dayjs(savedDate);
  const currentDateObj = dayjs(currentDate);

  const passed = currentDateObj.diff(savedDateObj, "minute");
  console.log(passed);
  setPassedMinute(passed);
};

export default OneHourPage;
