import csv
import json

file = open("../Data/refCSVpd.csv")
reader = csv.DictReader( file, fieldnames = ( "Institution","Reference_Count" ))  
out = json.dumps( [ row for row in reader ] )  
file2 = open( 'static/data/data.json', 'w')  
file2.write(out)  