var karmaConfig = require('./karma.base');

module.exports = function (config) {
  karmaConfig.reporters = ['spec', 'coverage'];
  karmaConfig.coverageReporter = {
    type: 'html',
    dir: 'coverage/',
  };

  config.set(karmaConfig);
};