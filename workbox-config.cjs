module.exports = {
    globDirectory: 'build/',
    globPatterns: [
      '**/*.{html,js,css,json,svg,png,jpg}'
    ],
    swSrc: 'client/public/sw.js', // Updated path
    swDest: 'client/build/sw.js',
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  };