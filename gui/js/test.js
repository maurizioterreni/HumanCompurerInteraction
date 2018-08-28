var PythonShell = require('python-shell');
PythonShell.run('../../python/getWeatherStation.py', function (err, results) {
  if (err) throw err;
  console.log(results.toString());
});
