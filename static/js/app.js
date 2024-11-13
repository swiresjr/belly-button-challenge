// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const individual = getSelectedIndividual(data);
    const metadata = data.metadata.find(meta => meta.id === parseInt(individual));
    console.log(metadata);


    // Filter the metadata for the object with the desired sample number
    const sampleNumber = getDesiredSampleNumber(data);
    const filteredMetadata = data.metadata.filter(meta => meta.id === parseInt(sampleNumber));
    console.log(filteredMetadata)

    if (filteredMetadata.length > 0) {
      const metadataObject = filteredMetadata[0]; // Get the first (and should be only) object
      console.log(metadataObject);
    } else {
      console.log("No metadata found for the specified sample number.");
    }


    // Use d3 to select the panel with id of `#sample-metadata`
    d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      d3.select("#sample-metadata")
        .append("p") // Append a new paragraph tag
        .text(`${key}: ${value}`); // Set the text to the key-value pair
  });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples; 
    console.log(samples);

    // Filter the samples for the object with the desired sample number
    const filteredSample = samples.find(sample => sample.id === desiredSampleNumber);

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = filteredSample[0].otu_ids; // Accessing otu_ids from the first filtered sample
    const otu_labels = filteredSample[0].otu_labels; // Accessing otu_labels
    const sample_values = filteredSample[0].sample_values; // Accessing sample_values
  }
} 
// Build a Bubble Chart
  // Set up the dimensions and margins for the chart
const width = 800;
const height = 600;

// Create an SVG element
const svg = d3.select("#bubble-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create scales for the x and y axes
const xScale = d3.scaleLinear()
    .domain([d3.min(otu_ids), d3.max(otu_ids)]) // Set the domain based on otu_ids
    .range([0, width]); // Set the range to the width of the SVG

const yScale = d3.scaleLinear()
    .domain([0, d3.max(sample_values)]) // Set the domain based on sample_values
    .range([height, 0]); // Invert the range for y-axis

// Create a scale for the bubble sizes
const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(sample_values)]) // Set the domain based on sample_values
    .range([0, 40]); // Set the maximum radius for the bubbles

// Create the bubbles
svg.selectAll("circle")
    .data(sample_values)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(otu_ids[i])) // Set x position based on otu_ids
    .attr("cy", (d) => yScale(d)) // Set y position based on sample_values
    .attr("r", (d) => sizeScale(d)) // Set the radius based on sample_values
    .attr("fill", (d, i) => d3.schemeCategory10[otu_ids[i] % 10]) // Use otu_ids for marker colors
    .attr("opacity", 0.6)
    .attr("stroke", "black");

// Add labels to the bubbles
svg.selectAll("text")
    .data(sample_values)
    .enter()
    .append("text")
    .attr("x", (d, i) => xScale(otu_ids[i]))
    .attr("y", (d) => yScale(d))
    .text((d, i) => otu_labels[i]) // Use otu_labels for the text values
    .attr("font-size", "10px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");
    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Load the data
d3.json('https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json').then(function(data) {
  // Assuming you have a function to get the selected individual
  const individual = getSelectedIndividual(data);
  
  // Extract the sample data for the individual
  const sampleData = data.samples.find(sample => sample.id === individual);
  
  // Sort the sample values and get the top 10 OTUs
  const sortedData = sampleData.sample_values
      .map((value, index) => ({
          value: value,
          id: sampleData.otu_ids[index],
          label: sampleData.otu_labels[index]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  
  // Prepare data for the bar chart
  const otuIds = sortedData.map(d => `OTU ${d.id}`);
  const sampleValues = sortedData.map(d => d.value);
  const otuLabels = sortedData.map(d => d.label);
  
  // Create the bar chart
  const trace = {
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      type: 'bar',
      orientation: 'h'
  };
  
  const layout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
  };
  
  Plotly.newPlot('bar', [trace], layout);
});

// Function to get the selected individual (you will need to implement this)
function getSelectedIndividual(data) {
  // Logic to get the selected individual ID
  return 'some_id'; // Replace with actual logic
}
// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
