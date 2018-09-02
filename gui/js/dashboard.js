'use strict'
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var request = require('request');
window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');
window.Bootstrap = require('bootstrap');

$( document ).ready(function() {
  //document.getElementById('containerDashboard').innerHTML = "<div class=\"container\" id=\"containerDashboard\"><div style=\"width:100%; text-align: center; margin-top:20px;\"><img src=\"../images/loading-icon.gif\"/></div></div>";
  //myConsole.log('i am here');
    request('http://maurizioterreni.altervista.org/rest/services/weatherstation/read.php', function (error, response, body) {
        myConsole.log('error:', error); // Print the error if one occurred
        myConsole.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //myConsole.log('body:', body); // Print the HTML for the Google homepage.
        if(response.statusCode == 200){
          var obj = JSON.parse(body.replace(/ 0+(?![\. }])/g, ' '));
          var html = '';
          for(var k in obj) {
            var div = '<div class="col-md-6"><div class="card"><div class="card-header"> '
                 + obj[k].description +'<br></div><div class="card-body"><h4 class="text-center"> '
                 + 'Card title</h4><img class="img-fluid d-block mx-auto imgWeather" style="margin:auto;" src="'
                 +obj[k].image+'"><div class="row text-center my-4"><div class="col-md-6 text-center"><button type="button" id="buttonOpenMaps" data-toggle="modal" data-target="#mapsModal" class="btn btn-primary" href="#">'
                 +'Maps</button></div><div class="col-md-6"><button type="button" id="buttonOpenSensor" href="#" class="btn btn-primary">Open</button></div></div></div></div></div>';
             if(k%2 == 0){
               html += '<div class="row">';
               html += div;
             }else{
               html += div;
               html += '</div>';
             }
          }
          $('#containerDashboard').html(html);
        }else{
          $('#containerDashboard').html("<div class=\"alert alert-danger\" style=\"margin-top:20px\" role=\"alert\"><strong>Error " + response.statusCode + "! I can't read data.</div>");
        }
  });


  $("#buttonOpenMaps").on("click", function(){
    $("#mapsModal").modal('show');
  });

  $('#buttonOpenSensor').on("click", function(){
    $('#containerDashboard').html(ciao);
  });

});

$(function() {
    $("#map").googleMap({
      zoom: 10, // Initial zoom level (optional)
      coords: [48.895651, 2.290569], // Map center (optional)
      type: "ROADMAP" // Map type (optional)
    });
})
