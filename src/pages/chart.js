import * as React from "react";
import Layout from "../components/layout";
import "../components/piChart";
// import Chart from "../components/piChart";
import InputFile from "../components/input.js";

const chartPage = () => {
  return (
    <Layout>
      <InputFile type="file" accept="image/*" onChange={(e) => null} />
      {/* <Chart /> */}
    </Layout>
  );
};

export default chartPage;
