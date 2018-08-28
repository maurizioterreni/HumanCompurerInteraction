

'''
Created on 21 lug 2018

@author: maurizio
'''
import json
import sys
import requests

response = requests.get('http://maurizioterreni.altervista.org/rest/services/weatherstation/read.php')

html = ""
if(response.status_code == 200):
    html = "<div class=\"alert alert-success\" role=\"alert\"><strong>" + str(response.status_code)  + "! </div>"
    #if(k%2 == 0){
    #html += '<div class="row">';
    #html += '<div class="col-md-6"><div class="card"><div class="card-header"> '+obj[k].description+'<br></div><div class="card-body"><h4 class="text-center">Card title</h4><img class="img-fluid d-block mx-auto imgWeather" style="margin:auto;" src="'+obj[k].image+'"><div class="row text-center my-4"><div class="col-md-6 text-center"><a class="btn btn-primary" href="#">Maps<br></a></div><div class="col-md-6"><a class="btn btn-primary" href="#">Open<br></a></div></div></div></div></div>';
    #}else{
    #html += '<div class="col-md-6"><div class="card"><div class="card-header"> '+obj[k].description+'<br></div><div class="card-body"><h4 class="text-center">Card title</h4><img class="img-fluid d-block mx-auto imgWeather" style="margin:auto;" src="'+obj[k].image+'"><div class="row text-center my-4"><div class="col-md-6 text-center"><a class="btn btn-primary" href="#">Maps<br></a></div><div class="col-md-6"><a class="btn btn-primary" href="#">Open<br></a></div></div></div></div></div>';
    #html += '</div>';
    #}
else:
    html = "<div class=\"alert alert-danger\" style=\"margin-top:20px\" role=\"alert\"><strong>Error " + str(response.status_code) + "! I can't read data.</div>"

print(html)
sys.stdout.flush()
