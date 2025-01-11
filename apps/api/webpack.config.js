const { composePlugins, withNx } = require('@nx/webpack')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // Add allowedHosts configuration for ngrok URL
  config.devServer = {
    ...config.devServer,
    allowedHosts: [
      'localhost',
      '.ngrok-free.app', // Allow all ngrok subdomains
    ],
  }

  return config
})
