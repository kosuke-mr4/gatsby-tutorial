import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="kizi ichiran">
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`blog/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
        </article>
      ))}
    </Layout>
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

// {
//   "data": {
//     "allMdx": {
//       "nodes": [
//         {
//           "frontmatter": {
//             "date": "August 13, 2021",
//             "title": "二個目の投稿です"
//           },
//           "id": "1b7fce55-60d6-5196-ac44-b9eda9c727a3",
//           "slug": "second/"
//         },
//         {
//           "frontmatter": {
//             "date": "August 12, 2021",
//             "title": "初投稿です"
//           },
//           "id": "a6c72cf1-4d65-5100-b396-ed035c4783f0",
//           "slug": "first/"
//         }
//       ]
//     }
//   },
//   "extensions": {}
// }

export default BlogPage;
