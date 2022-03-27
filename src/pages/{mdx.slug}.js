import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ArticleLayout from "../components/articleLayout";
import { Helmet } from "react-helmet";

const BlogPost = ({ data }) => {
  const imagePath =
    data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData.images
      .fallback.src;
  const image = getImage(data.mdx.frontmatter.hero_image);
  const title = data.mdx.frontmatter.title;
  return (
    <>
      <Helmet>
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={imagePath} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:image"
          content={`${data.site.siteMetadata.siteUrl}${imagePath}`}
        />
      </Helmet>
      <ArticleLayout pageTitle={title}>
        <p>Posted: {data.mdx.frontmatter.date}</p>
        <GatsbyImage image={image} />
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </ArticleLayout>
    </>
  );
};

export const query = graphql`
  query ($slug: String) {
    mdx(slug: { eq: $slug }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
export default BlogPost;
