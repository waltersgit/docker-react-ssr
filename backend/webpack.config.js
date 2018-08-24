const path = require("path")
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        main: [
            "./app.js"
        ]
    },
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./build")
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
                                'stage-0',
                                'es2015',
                                ['env', { targets: {browsers: ['last 2 versions'] }}]
                            ],
                            "plugins": [
                                "transform-runtime"
                            ]
                        }
                    }
                ]
            }
        ]
    }
}