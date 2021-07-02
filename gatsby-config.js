module.exports = {
    plugins: [
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "data",
                path: `${__dirname}/src/data/`,
            },
        },
        "gatsby-transformer-csv",
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /images/
                }
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
            name: `Headstone Addresses`,
            short_name: `Headstone Addresses`,
            start_url: `/`,
            background_color: `#eae4de`,
            theme_color: `#eae4de`,
            display: `standalone`,
            icon: `src/images/logo.svg`
            },
        },
    ],
}