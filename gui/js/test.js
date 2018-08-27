const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["../../python/getWeatherStation.py"]);


pythonProcess.stdout.on('data', (data) => {
  console.log(data);
});
