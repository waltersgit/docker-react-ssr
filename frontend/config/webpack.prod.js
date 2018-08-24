const path = require("path")
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    entry: {
        main: [
            "./src/client/client.js"
        ]
    },
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../public")
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                'react',
                                'stage-0',
                                'es2015',
                                ['env', { targets: {browsers: ['last 2 versions'] }}]
                            ],
                            "plugins": [
                                "transform-runtime",
                                "transform-class-properties"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: MiniCssExtractPlugin.loader },
                    { 
                        loader: "css-loader"
                        // ,
                        // query: {
                        //     modules: true,
                        //     localIdentName: "[name]--[local]--[hash:base64:8]"
                        // } 
                    },
                    { 
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
                        }
                    },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name]-[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                discardComments: {removeAll: true}
            },
            canPrint: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css"
        }),
        // new HTMLWebpackPlugin({
        //     template: "./src/index.html"
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new MinifyPlugin(),
        new UglifyJSPlugin(),
        new CompressionPlugin({
            algorithm: "gzip"
        })
    ]
}