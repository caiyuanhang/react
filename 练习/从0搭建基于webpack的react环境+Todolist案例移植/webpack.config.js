const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve("./dist"),
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                }
            }]
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve("./public/index.html"),
    })],
    devServer: {
        contentBase: "./public",
        port: 8081,
        hot: true,
        open: true,
    }
}