const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/frontend/app.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            { from: 'src/frontend/index.html', to: 'index.html' }
        ])
    ],
    // frontend dev server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        open: true
    },
};