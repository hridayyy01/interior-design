const path = require('path');
const webpack  = require('webpack');

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
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devServer : {
        watchFiles: {
            paths:['./app/**/*.html'],
            options: {
                ignored: './app/assets/*'
            }
        },
        static: {
            directory: path.join(__dirname,"app"),
            watch: false
        },
        hot:'only',
        port: 3000
    },
    mode: 'development',
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