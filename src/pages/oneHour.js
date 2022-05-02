import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import dayjs from "dayjs";

const OneHourPage = () => {
  const [savedDate, setSavedDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  // ここで格納した場合１分ごとの操作とかはどうしようかな

  useEffect(() => {
    let localDate = localStorage.getItem("date");

    if (localDate == null) {
      const nowDate = dayjs().format();
      localStorage.setItem("date", nowDate);
      console.log("set!!!");
    } else {
      console.log(localDate);
    }
  });

  return (
    <>
      <Layout pageTitle={"one hour timer"}>AAAAAAAAAAAAAAAAAAAAAAAA</Layout>
    </>
  );
};

export default OneHourPage;
