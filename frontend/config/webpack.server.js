const path = require("path")
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        main: ["./src/index.js"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../build")
    },
    externals: [webpackNodeExternals()],
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
                                ['env', { targets: {browsers: ['last 2 versions'] }}]
                            ],
                            "plugins": [
                                "transform-runtime"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
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
    }
}