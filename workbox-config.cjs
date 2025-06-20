module.exports = {
    globDirectory: 'build/',
    globPatterns: [
      '**/*.{html,js,css,json,svg,png,jpg}'
    ],
    swSrc: 'public/service-worker.js', // Updated path
    swDest: 'build/service-worker.js',
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  };