# Potentially Contaminated Water Sources from Ohio Train Derailment and the Risks Posed to Ohio Farms

Help determine where your food comes from in Ohio and if there's a risk of it having been contaminated by the recent Ohio train derailment. 




## Project Philosophy

After the Ohio train derailment in Febraury 2023, I realized that was limited data on where exactly our food comes from. While the EU has a lot of transparancy in their food sources (with programs like TRACE), there's isn't as much transparancy in the US. 

In an effort to help orivde transparancy and using publically available data, I compiled a list of Ohio farms, including what county they're located in and what they produce. I then researched water pathways in Ohio to determine which counties were the most at risk for having their water source contaminated based on their location relative to East Palestine. 
## Features

- Search through Ohio farms
- Filter farms and counties by first letter or by what the farm produces
- Show and hide a map of Ohio
- Add a farm to the database


## Installation

To begin, copy the SSH code. In your terminal, type "git clone" and paste the copied code. Navigate to the cloned folder. 

This uses data from the json-server. If you haven't yet, install json-server. 

$ npm install -g json-server

This run the server with:

$ json-server --watch db.json

Open a new tab in your terminal and enter:

$ open index.html

This will open a webpage where you can begin to use the tool. 


    
## How to Use

Within this repo, you can view the data compiled and add new farms to the list. 

For ease of use, you can how and hide the Ohio map at the top:

![](https://github.com/AspenWilson/phase-1-project/blob/main/HitPawOnline_103923.gif)

Filtering Farms and Counties

On the left side on the screen, you'll find filter view options. Here, you can filter the data by Farm Name, County, or by what the farms produce. Click on the drop downs to filter the data. To see more data on any partiuclar farm or couty, click on the desired item and the information will be displayed in the center of the page: 
![](https://github.com/AspenWilson/phase-1-project/blob/main/HitPawOnline_104456.gif)

Adding a new farm

On the right side of the screen, you can add a farm to the list. To add a farm, you need the farm name, it's county, and what it produces. Follow these steps to add a farm:
1. Click the "Click here to add farm" button
2. Enter the County name
3. Click "Populate Risk" button to get the risk associated with that county
NOTE: If risk doesn't populate, check the spelling of your entered county. 

4. Select what the farm produces from the dropdown. 
5. Click "Submit".

A confirmation of your new farm entry will appear in the middle of the page:

![](https://github.com/AspenWilson/phase-1-project/blob/main/HitPawOnline_104651.gif)
## Technologies Used

This web app was made using 
- Vanilla Javascript
- VS Code
- JSON server

With help from the sources listed on the page. 

Note: This is an SPA. 
