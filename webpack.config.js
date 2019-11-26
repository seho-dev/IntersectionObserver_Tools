const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
      observertools: './main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ["css-loader"]
        }]
    }
}