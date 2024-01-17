import path from "path";
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

type BuildMode = "development" | "production";

interface EnvVariables {
    mode: BuildMode
}

module.exports = (env: EnvVariables) => {
    const config: webpack.Configuration = {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, 'index.tsx'),
        devtool: 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            port: 3000
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                filename: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        }
    }

    return config;
}