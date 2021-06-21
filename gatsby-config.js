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
        }
    ],
}