// use d3 to get the JSON data
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function (data){
// check that data is being pulled in correctly
console.log(data);

bioData = data;

// create dropdown menu
data.names.forEach((name) => {
    d3.select("#selDataset").append("option").text(name);
});

// set default value
let choice = d3.select("select").node().value;
optionChanged(choice);
});

// show new data when selection changes
function optionChanged(id){

    let otu = bioData.samples.find((sample) => sample.id === id);
    let meta = bioData.metadata.find((sample) => sample.id === parseInt(id));

// update the plots with the data for the selection
barChart(otu);
bubbleChart(otu);
metaData(meta);
}


