/*
  var PythonShell = require('python-shell');
  PythonShell.run('/python/getWeatherStation.py', function (err, results) {
    if (err) throw err;
    console.log(results.toString());
    document.getElementById('containerDashboard').innerHTML = results.toString();
  });

}

*/
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var request = require('request');

function loadCard() {
  myConsole.log('i am here');
/*  const request = net.request({
      method: 'GET',
      protocol: 'http:',
      hostname: 'maurizioterreni.altervista.org',
      path: '/rest/services/weatherstation/read.php'
    })


  request.on('response', (response) => {
      myConsole.log(`STATUS: ${response.statusCode}`);
      response.on('error', (error) => {
        myConsole.log(`ERROR: ${JSON.stringify(error)}`)
      })
    })*/


    request('http://maurizioterreni.altervista.org/rest/services/weatherstation/read.php', function (error, response, body) {
      //myConsole.log('error:', error); // Print the error if one occurred
    //  myConsole.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //myConsole.log('body:', body); // Print the HTML for the Google homepage.
      if(response.statusCode == 200){
        document.getElementById('containerDashboard').innerHTML = "<div class=\"alert alert-success\" role=\"alert\"><strong>" + response.statusCode  + "! </div>";
      }else{
        document.getElementById('containerDashboard').innerHTML = "<div class=\"alert alert-danger\" style=\"margin-top:20px\" role=\"alert\"><strong>Error " + response.statusCode + "! I can't read data.</div>";
      }
    });
  }





/*

function loadCard(){
var str = '[{"id": "1","description": "WeatherStation Empoli","longitude": "10.951802242615486","latitude": "43.69489556632679","image": "https://images.pond5.com/meteorological-weatherstation-anemometer-footage-000591947_iconl.jpeg","sensors": "[1,2,3,4,5,6,7]"},{"id": "2","description": "Stazione Meteo di User1","longitude": "10.93473908437511","latitude": "43.791581260296006","image": "http://zwaveit.com/image/cache/data/65Riego/69%20Jardin/qubino-station-meteo-z-wave-zmnhzd1-600x600.jpg","sensors": "[8,9,10,11,12,13]"},{"id": "4","description": "Stazione Meteo Santa Marta","longitude": "11.2527708005249","latitude": "43.79850144596702","image": "http://ppsystems.com/wp-content/uploads/MetPak-Pro.jpg","sensors": "[]"}]';
var obj = JSON.parse(str.replace(/ 0+(?![\. }])/g, ' '));
var html = '';
for(var k in obj) {
 if(k%2 == 0){
   html += '<div class="row">';
   html += '<div class="col-md-6"><div class="card"><div class="card-header"> '+obj[k].description+'<br></div><div class="card-body"><h4 class="text-center">Card title</h4><img class="img-fluid d-block mx-auto imgWeather" style="margin:auto;" src="'+obj[k].image+'"><div class="row text-center my-4"><div class="col-md-6 text-center"><a class="btn btn-primary" href="#">Maps<br></a></div><div class="col-md-6"><a class="btn btn-primary" href="#">Open<br></a></div></div></div></div></div>';
 }else{
   html += '<div class="col-md-6"><div class="card"><div class="card-header"> '+obj[k].description+'<br></div><div class="card-body"><h4 class="text-center">Card title</h4><img class="img-fluid d-block mx-auto imgWeather" style="margin:auto;" src="'+obj[k].image+'"><div class="row text-center my-4"><div class="col-md-6 text-center"><a class="btn btn-primary" href="#">Maps<br></a></div><div class="col-md-6"><a class="btn btn-primary" href="#">Open<br></a></div></div></div></div></div>';
   html += '</div>';
 }
}
document.getElementById('containerDashboard').innerHTML = html;
console.log(html);
}

//function loadCard() {

/*  var i;
  var html = '';
  for (i = 0; i < 10; i++) {
    if(i%2 == 0){
      html += '<div class="row">';
      html += '<div class="col-md-6"><div class="card"><div class="card-header"> Stazione meteo '+i+'<br></div><div class="card-body"><h4 class="text-center">Card title</h4><img class="img-fluid d-block mx-auto" style="margin:auto;" src="https://pingendo.com/assets/photos/wireframe/photo-1.jpg" width="200" height="200"><div class="row text-center my-4"><div class="col-md-6 text-center"><a class="btn btn-primary" href="#">Maps<br></a></div><div class="col-md-6"><a class="btn btn-primary" href="#">Open<br></a></div></div></div></div></div>';
    }else{
      html += '<div class="col-md-6"><div class="card"><div class="card-header"> Stazione meteo '+i+'<br></div><div class="card-body"><h4 class="text-center">Card title</h4><img class="img-fluid d-block mx-auto" style="margin:auto;" src="https://pingendo.com/assets/photos/wireframe/photo-1.jpg" width="200" height="200"><div class="row text-center my-4"><div class="col-md-6 text-center"><a class="btn btn-primary" href="#">Maps<br></a></div><div class="col-md-6"><a class="btn btn-primary" href="#">Open<br></a></div></div></div></div></div>';
      html += '</div>';
    }
  }*/


//}
