// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.nrednav.chronos",
        directories: {
          buildResources: "build/assets"
        },
        mac: {
          target: "dmg"
        },
        win: {
          target: "portable"
        }
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    }
  }
};
