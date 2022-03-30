import * as React from "react";
import Layout from "../components/layout";
import WordleInput from "../components/wordleInput.js";

const WordleSolver = () => {
  return (
    <>
      <Layout pageTitle={"Wordle Solver"}>
        <WordleInput />
      </Layout>
    </>
  );
};

export default WordleSolver;
