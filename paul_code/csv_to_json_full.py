import csv
import json

file = open("../Data/refCSVpdFULL.csv")
reader = csv.DictReader( file, fieldnames = ("Part_Count","Chapter_Count","Page_Number","Institution","Language","Keyword","URL" ))  
out = json.dumps( [ row for row in reader ] )  
file2 = open( 'static/data/dataFULL.json', 'w')  
file2.write(out) 