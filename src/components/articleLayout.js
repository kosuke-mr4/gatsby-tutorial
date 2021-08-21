import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { heading, siteTitle } from "./layout.module.css";
import { articleContainer } from "./articleLayout.module.css";

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
  return (
    <main className={articleContainer}>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={siteTitle}>{data.site.siteMetadata.title}</div>
      </Link>
      <h1 className={heading}>{pageTitle}</h1>
      {children}
      <Footer />
    </main>
  );
};

export default ArticleLayout;
