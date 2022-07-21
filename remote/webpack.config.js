const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  devServer: {
    port: 8080,
  },
  cache: {
    type: "filesystem", // filesystem 或者 memory
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 这个配置不写也可以 默认是这个路径
  },
  optimization: {
    usedExports: true, // 标注使用node导出
    moduleIds: "deterministic", // 模块名称的生成规则
    chunkIds: "deterministic", // 代码块名称的生成规则
  },
  output: {
    filename: "[name].js", // 入口代码文件名的生成规则
    chunkFilename: "[name].js", //非入口模块的生成规则
  },
  resolve: {
    // 如果不需要 则直接改为false
    // fallback: {
    //   crypto: false,
    //   stream: false,
    //   buffer: false,
    // },
    // 如果需要 则需要自己安装对应polyfill
    // fallback: {
    //   crypto: require.resolve("crypto-browserify"),
    //   stream: require.resolve("stream-browserify"),
    //   buffer: require.resolve("buffer-browserify"),
    // },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.png$/,
        type: "asset/resource", // file-loader
      },
      {
        test: /\.ico$/,
        type: "asset/inline", // url-loader
      },
      {
        test: /\.txt$/,
        type: "asset/source", // raw-loader
      },
      {
        test: /\.jpg$/,
        type: "asset", // raw-loader
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 小于4k打包成base64
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.js", // 暴露的文件
      },
    }),
  ],
};
