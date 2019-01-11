const path = require("path")

const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./public/index.js"
  , devtool: "#source-map" //inline-source-map
  , output: {
    path: path.resolve("dist")
    , filename: "bundle.js"
    , publicPath: "/dist"
  }
  , mode: "none"
  // , target: "web"
  , module: {
    rules: [
      {
        test: /\.js$/
        // , exclude: /node_modules/
        , use: {
          loader: "babel-loader"
          , options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
      , {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        // test: /\.html$/
        // , use: [{loader: "html-loader"}]
        // , options: { minimize: true }
      }
      , {
        // test: /\.(png|svg|jpg|gif)$/
        // , use: ["file-loader"]
      }
    ]
  }
  , plugins: [
    // This plugin will also insert a script tag in the HTML file that imports
    // the main Javascript file
    new HtmlWebPackPlugin({
      template: "./public/index.html"
      , filename: "./index.html"
      // excludeChunks will exclude a file called server which we don’t want to
      // be included into our HTML file, since that is the webserver, and not
      // needed in the app itself
      , excludeChunks: [ "server" ]
    })
  ]
}
