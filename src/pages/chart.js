import * as React from "react";
import Layout from "../components/layout";
// import Chart from "../components/piChart";
import InputFile from "../components/input.js";
import { Helmet } from "react-helmet";

const chartPage = () => {
  return (
    <>
      <Helmet>
        <title>ScoreChart</title>
      </Helmet>
      <Layout pageTitle={"ScoreChart"}>
        <InputFile type="file" onChange={(e) => null} />
        {/* <Chart /> */}
      </Layout>
    </>
  );
};

export default chartPage;
