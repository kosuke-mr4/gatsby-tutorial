import * as React from "react";
import Layout from "../components/layout";
import WordleInput from "../components/wordleInput.js";
import NoSSR from "react-no-ssr";

const WordleSolver = () => {
  return (
    <>
      <NoSSR>
        <Layout pageTitle={"Wordle Solver"}>
          <WordleInput />
        </Layout>
      </NoSSR>
    </>
  );
};

export default WordleSolver;
