import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { heading, siteTitle } from "./layout.module.css";
import { articleContainer } from "./articleLayout.module.css";

import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/codeblock";

import Footer from "./footer.js";

const ArticleLayout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const components = {
    code: CodeBlock,
  };

  return (
    <MDXProvider components={components}>
      <>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={siteTitle}>{data.site.siteMetadata.title}</div>
        </Link>
        <main className={articleContainer}>
          <title>
            {pageTitle} | {data.site.siteMetadata.title}
          </title>
          <h1 className={heading}>{pageTitle}</h1>
          {children}
          <Footer />
        </main>
      </>
    </MDXProvider>
  );
};

export default ArticleLayout;
