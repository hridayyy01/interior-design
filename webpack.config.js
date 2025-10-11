const path = require('path');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested')
]

module.exports = {
    entry: "./app/assets/scripts/app.js",
    output: {
        filename: "app.bundled.js",
        path: path.resolve(__dirname,'app')
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins : postCSSPlugins
                            }
                        }
                    }
                ]
            }
        ]
    }
}