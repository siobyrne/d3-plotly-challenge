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

// create bar chart for top ten OTUs
function barChart(otu){

    let topTen = otu.sample_values.slice(0,10).reverse();
    let labels = otu.otu_labels.slice(0,10).reverse();

      // create the trace
  let trace = {
    x: topTen,
    y: labels.map((labels, index) => `OTU ${otu.otu_ids[index]}`).slice().reverse(),
    text: labels,
    type: "bar",
    orientation: "h",
    marker:{
      color: 'rgba(255,153,51,0.6)'
    }
  };

  // create the layout
  let layout = {
    title: {
      text: "<b>Top Ten OTUs</b>",
      font: {size: 22,},
    },
    xaxis: {title: "<b>Number of Samples</b>"},
  };

  // show the chart
  Plotly.newPlot("bar", [trace], layout);
}

// create bubble chart
function bubbleChart(otu){
    // create the trace
    let trace = {
      x: otu.otu_ids,
      y: otu.sample_values,
      text: otu.otu_labels,
      mode: "markers",
      marker: {
        size: otu.sample_values,
        color: otu.otu_ids,
        colorscale: "agsunset",
      },
    };

    // create the layout
    let layout = {
        title: {
          text: "<b>All OTUs</b>",
          font: {size: 22,},
        },
        xaxis: {title: `<b>OTU ID</b>`},
        yaxis: {title: `<b>Number of Each OTU</b>`},
      };

      // plot the chart
      Plotly.newPlot("bubble", [trace], layout);
    }

    // show the metadata
    function metaData(info){
        // clear existing
        d3.select("#sample-metadata").html("");

        // display the metadata in the table
        Object.keys(info).forEach((key) => {
            value = info[key];
            d3.select("#sample-metadata").append("p").html(`<b>${key}:</b> ${value}`);
       
        });
 }

