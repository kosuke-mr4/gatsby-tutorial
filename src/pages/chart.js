import * as React from "react";
import Layout from "../components/layout";
// import Chart from "../components/piChart";
import InputFile from "../components/input.js";
import { Helmet } from "react-helmet";
import NoSSR from "react-no-ssr";

const chartPage = () => {
  return (
    <>
      <Helmet>
        <title>ScoreChart</title>
      </Helmet>
      {/* tmp : styeld component のssr時に一瞬スタイルが崩れる問題を調査しているのでひとまず<NoSSR>で囲っておきます */}
      <NoSSR>
        <Layout pageTitle={"ScoreChart"}>
          <InputFile type="file" onChange={(e) => null} />
        </Layout>
      </NoSSR>
    </>
  );
};

export default chartPage;
