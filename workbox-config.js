module.exports = {
    globDirectory: 'build/',
    globPatterns: [
      '**/*.{html,js,css,json,svg,png,jpg}'
    ],
    swSrc: 'src/service-worker.js',
    swDest: 'build/service-worker.js',
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  };