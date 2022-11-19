module.exports = {
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'data',
                path: `${__dirname}/src/data/`,
            },
        },
        'gatsby-transformer-csv',
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /images/,
                },
            },
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
                icon: `src/images/logo.svg`,
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ['G-YPY47T9LVR'],
                // This object gets passed directly to the gtag config command
                // This config will be shared across all trackingIds
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                // This object is used for configuration specific to this plugin
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: false,
                    // Setting this parameter is also optional
                    respectDNT: true,
                    // Avoids sending pageview hits from custom paths
                    exclude: ['/preview/**', '/do-not-track/me/too/'],
                },
            },
        },
    ],
};
