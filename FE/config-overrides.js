const path = require('path');

const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
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
    '@router': path.resolve(__dirname, 'src/router'),
    '@router/*': path.resolve(__dirname, 'src/router/*'),
    '@type': path.resolve(__dirname, 'src/type'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  }),
);
