const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve("./dist")
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use:[
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react"]
                        }
                    }
                ]
            },{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },{
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.resolve("./pubilc/index.html"),
        })
    ],

    devServer: {
        contentBase: "./pubilc",
        port: 2005,
        hot: true,
        open: true,
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },
}