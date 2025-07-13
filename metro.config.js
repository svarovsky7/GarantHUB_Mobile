const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    platforms: ['ios', 'android', 'native'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@/')) {
        const resolvedPath = path.resolve(__dirname, 'src', moduleName.substring(2));
        return context.resolveRequest(context, resolvedPath, platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
