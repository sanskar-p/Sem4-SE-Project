import pandas as pd   
  
#dataset courtesy: https://data.mendeley.com/datasets/y65fv5phbn/2

# read necessary csv files 
pond = pd.read_csv('rawData/Pond_water_Data.csv') 
pipe = pd.read_csv('rawData/Pipeline_drinking_water_data.csv') 
pack = pd.read_csv('rawData/Packaged_drinking_water_data.csv')

#remove unnecessary rows
keep = ['pH']
pH_pond = pond[keep]
pH_pipe = pipe[keep]
pH_pack = pack[keep]

#combine all 3 files to get good variance in pH values
combined = pd.concat([pH_pack, pH_pipe, pH_pond])

#randomly shuffle values
shuffled = combined.sample(frac=1)

#round to 2 decimal places
rounded = combined.round(2)

#removing duplicates
filtered = rounded.drop_duplicates(subset="pH") 

#export to final file
filtered.to_csv("waterQuality2.csv", index=False)
