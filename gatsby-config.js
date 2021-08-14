module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "murakami_blog",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-og-image`,
            options: {
              output: {
                directory: "",
                fileName: "thumbnail.png",
              },
              image: {
                width: 1200,
                height: 630,
                //backgroundImage: './src/assets/images/og-background.jpg'
                backgroundColor: "#15202B",
              },
              style: {
                title: {
                  fontFamily: "Noto Sans JP",
                  fontColor: "#1DA1F2",
                  fontWeight: "bold",
                  fontSize: 64,
                  paddingTop: 100,
                  paddingBottom: 200,
                  paddingLeft: 150,
                  paddingRight: 150,
                },
                author: {
                  fontFamily: "Noto Sans JP",
                  fontColor: "#DDDDDD",
                  fontWeight: "400",
                  fontSize: 42,
                },
              },
              meta: {
                title: "",
                author: "kosuke_mr4 (@kosuke_mr4)",
              },
              fontFile: [
                {
                  path: require.resolve(
                    "./src/assets/fonts/NotoSansJP-Bold.otf"
                  ),
                  family: "Noto Sans JP",
                  weight: "bold",
                },
              ],
              iconFile: require.resolve("./src/images/icon.png"),
              timeout: 10000,
            },
          },
        ],
      },
    },
  ],
};
