import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from "./layout.module.css";

import Footer from "./footer.js";

const Layout = ({ pageTitle, children }) => {
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
    <main className={container}>
      {/* <title suppressHydrationWarning>
        {pageTitle} | {data.site.siteMetadata.title}
      </title> */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={siteTitle}>{data.site.siteMetadata.title}</div>
      </Link>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className={heading}>{pageTitle}</h1>
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
