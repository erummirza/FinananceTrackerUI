// craco.config.js
module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.setupMiddlewares = (middlewares, devServer) => {
      if (!devServer) throw new Error('webpack-dev-server is not defined');

      // You can add custom middleware here if needed

      return middlewares;
    };
    return devServerConfig;
  },
};
