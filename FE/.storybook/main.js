const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-controls',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules', 'styles'];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@api': path.resolve(__dirname, '../src/api'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@context': path.resolve(__dirname, '../src/context'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@data': path.resolve(__dirname, '../src/data'),
      '@hoc': path.resolve(__dirname, '../src/hoc'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@mocks': path.resolve(__dirname, '../src/mocks'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@router': path.resolve(__dirname, '../src/router'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@store': path.resolve(__dirname, '../src/store'),
    };
    return config;
  },
};
