const path = require("path")
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        main: [
            "webpack-hot-middleware/client?reload=true",
            "./src/client/client.js"
        ]
    },
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../public")
    },
    devServer: {
        contentBase: "public",
        overlay: true,
        hot: true,
        stats: {
            colors: true
        },
        // proxy:{
        //     '/api/*:': {
        //         target: 'http://localhost:3000'
        //     }
        // },
        port: 9000
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
                    { 
                        // query: {
                        //     modules: true,
                        //     localIdentName: "[name]--[local]--[hash:base64:8]"
                        // },
                        loader: "css-loader"
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
        // new HTMLWebpackPlugin({
        //     template: "./src/index.html"
        // }),
        new webpack.HotModuleReplacementPlugin()
    ]
}