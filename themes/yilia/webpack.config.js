const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry: {
        main: "./source-src/js/main.js",
        slider: "./source-src/js/slider.js",
        mobile: ["./source-src/js/mobile.js"]
    },
    output: {
        path: path.resolve(__dirname, "source"),
        publicPath: "./",
        filename: "[name].[chunkhash:6].js"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[hash:6].[ext]",
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader' },
                    { loader: "postcss-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader" 
                }, {
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                minifyJS: true
            },
            template: './source-src/script.ejs',
            favicon: './source-src/favicon.ico',
            filename: '../layout/_partial/script.ejs'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                minifyJS: true
            },
            template: './source-src/css.ejs',
            favicon: './source-src/favicon.ico',
            filename: '../layout/_partial/css.ejs'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {from: path.join(__dirname, './assets'),to: path.join(__dirname, './source/assets')}
        ])
    ]
};

module.exports = config;