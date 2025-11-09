const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require("fs-extra");

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested')
]

class TaskAfterCompilation {
    apply(compiler) {
        compiler.hooks.done.tap('Copy Images',function() {
            fse.copySync('./app/assets/images','dist/assets/images');
        })
    }
}

let cssConfig = {
    test: /\.css$/i,
    use: [
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
                    plugins: postCSSPlugins
                }
            }
        }
    ]
}

let config = {
    entry: "./app/assets/scripts/app.js",
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin ({
            filename: "index.html",
            template: "./app/index.html",
        })
    ],
    module: {
        rules: [
            cssConfig
        ]
    }
}

if (currentTask === "dev") {
    config.output = {
        filename: "app.bundled.js",
        path: path.resolve(__dirname, 'app'),
    };
    config.devServer = {
        watchFiles: {
            paths: ['./app/**/*.html'],
            options: {
                ignored: './app/assets/*'
            }
        },
        static: {
            directory: path.join(__dirname, "app"),
            watch: false
        },
        hot: 'only',
        port: 3000
    }
    cssConfig.use.unshift('style-loader');
    config.mode = 'development';
}


if (currentTask === "build") {
    config.output = {
        filename: "[name][chunkhash].js",
        chunkFilename: "[name][chunkhash].js",
        path: path.resolve(__dirname, 'dist'),
    };

    config.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    }
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.[chunkhash].css"
        }),
        new TaskAfterCompilation()
    );

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postCSSPlugins.push(require('cssnano'));
    config.mode = "production";
}

module.exports = config;