// use d3 to get the JSON data
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url.then(function (data){

// check that data is being pulled in correctly
console.log(data);

// assign a variable to the data
bioData = data;

// create dropdown menu
data.names.forEach((name) => {
    d3.select("#selDataset").append("option").text(name);
});




});