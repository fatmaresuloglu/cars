const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    transformer: {},
    resolver: {
      assetExts: defaultConfig.resolver.assetExts,
      sourceExts: defaultConfig.resolver.sourceExts,
    },
  });
})();
