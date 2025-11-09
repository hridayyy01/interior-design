const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const webpack  = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested')
]

let config = {
    entry: "./app/assets/scripts/app.js",
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
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

if(currentTask === "dev") {
    config.output = {
        filename: "app.bundled.js",
        path: path.resolve(__dirname,'app'),
    };

    config.devServer = {
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
    }
    config.mode = 'development';
}

if(currentTask === "build") {
    config.output = {
        filename: "[name][chunkhash].js",
        chunkFilename: "[name][chunkhash].js",
        path: path.resolve(__dirname,'dist'),
    };

    config.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    }
    config.plugins.push(new CleanWebpackPlugin());
    config.mode = "production";
}

module.exports = config;