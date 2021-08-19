import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = () => {
  return (
    <Layout pageTitle="About">
      <StaticImage alt="the working cat" src="../images/shigotoneko.jpg" />
      <div />
      <br />
      <div>おれです、自己を表すSNSアカウントがありません</div>
      <div>自作のアイコンが欲しいです</div>
    </Layout>
  );
};

export default AboutPage;
