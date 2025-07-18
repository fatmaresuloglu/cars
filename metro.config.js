// metro.config.js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    transformer: {
      // Eğer SVG kullanıyorsanız bu satırı ekleyin, yoksa kaldırabilirsiniz.
      // babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      // ÖNEMLİ: Varsayılan asset uzantılarına 'ttf' ve 'otf' ekliyoruz
      assetExts: [...defaultConfig.resolver.assetExts, 'ttf', 'otf'],
      // Eğer SVG kullanıyorsanız bu satırı ekleyin, yoksa kaldırabilirsiniz.
      // sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
  });
})();
