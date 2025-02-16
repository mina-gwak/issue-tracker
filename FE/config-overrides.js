const path = require('path');

const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@data': path.resolve(__dirname, 'src/data'),
    '@hoc': path.resolve(__dirname, 'src/hoc'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@mocks': path.resolve(__dirname, 'src/mocks'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@query': path.resolve(__dirname, 'src/query'),
    '@router': path.resolve(__dirname, 'src/router'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@type': path.resolve(__dirname, 'src/type'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  }),
);
