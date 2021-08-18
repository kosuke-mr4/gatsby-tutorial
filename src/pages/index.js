import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

const BlogPage = ({ data }) => {
  return (
    <>
      <Helmet>
        <meta property="og:site_name" content="murakami blog" />
        <meta name="description" content="村上のブログ" />
        <meta property="og:image" content="src/images/shigotoneko.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="murakami blog" />
        <meta name="twitter:description" content="村上のブログ" />
        <meta name="twitter:image" content="src/images/shigotoneko.jpg" />
      </Helmet>
      <Layout pageTitle="kizi ichiran">
        {data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
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
  }
`;

export default BlogPage;
