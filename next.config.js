// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@material-ui/core', '@material-ui/icons', '@material-ui/styles'])

module.exports = withTM({
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    domains: ['mangaldeepsarveshaampujaportal.azurewebsites.net', 'localhost', 'img.freepik.com', 'thumbs.dreamstime.com'],
  },


  webpack: (config, options) => {
    ; (config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }),
      config.module.rules.push({
        test: /\.+(js|jsx|ts|tsx)$/,
        use: options.defaultLoaders.babel,
        include: [/@material-ui/]
      })

    return config
  }
})
