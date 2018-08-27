'''
Created on 21 lug 2018

@author: maurizio
'''
import json
import sys
import requests

response = requests.get('http://maurizioterreni.altervista.org/rest/services/weatherstation/read.php')
print(response.json() + " hello")
sys.stdout.flush()
