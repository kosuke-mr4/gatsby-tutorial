import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

import cat from "../images/shigotoneko.jpg";

const pageCard = {
  borderBottom: "solid 1px #595959",
};

const BlogPage = ({ data }) => {
  console.log(data.site.siteMetadata.siteUrl);
  return (
    <>
      <Helmet>
        <meta property="og:site_name" content="murakami blog" />
        <meta name="description" content="村上のブログ" />
        <meta
          property="og:image"
          content={`${data.site.siteMetadata.siteUrl}${cat}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="murakami blog" />
        <meta name="twitter:description" content="村上のブログ" />
        <meta
          name="twitter:image"
          content={`${data.site.siteMetadata.siteUrl}${cat}`}
        />
      </Helmet>
      <Layout pageTitle="記事一覧">
        {data.allMdx.nodes.map((node) => (
          <article key={node.id} style={pageCard}>
            <h2>
              <Link
                to={`/${node.slug}`}
                style={{ textDecoration: "none", color: "#595959" }}
              >
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))}
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default BlogPage;
