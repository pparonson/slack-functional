const path = require("path")

module.exports = {
  entry: ["./public/index.js"]
  , devtool: "inline-source-map"
  , output: {
    path: path.resolve(__dirname, "dist")
    , filename: "./bundle.js"
  }
  , mode: "none"
  , module: {
    rules: [{
      test: /\.js$/
      , exclude: /node_modules/
      , use: {
        loader: "babel-loader"
        , options: {
          presets: ["@babel/preset-env"]
        }
      }
    }]
  }
}
