
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});
  
  // Initialize the dashboard at start up 
  function init() {
  
      // Use D3 to select the dropdown menu
      let dropMenu = d3.select("#selDataset");
  
      // Use D3 to get sample names and populate the drop-down selector
      d3.json(url).then((data) => {
          
          // Set a variable for the sample names
          let names = data.names;
  
          // Add  samples to dropdown menu
          names.forEach((id) => {
  
              // Log the value of id for each iteration of the loop
              console.log(id);
  
              dropMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // Set the first sample from the list
          let sample_one = names[0];
  
          // Log the value of sample_one
          console.log(sample_one);
  
          // Build the initial plots
          buildGaugeChart(sample_one);
      });
  };
  
  // Function that builds the gauge chart
  function buildGaugeChart(sample) {
  
      // Use D3 to retrieve all of the data
      d3.json(url).then((data) => {
  
          // Retrieve all metadata
          let metadata = data.metadata;
  
          // Filter based on the value of the sample
          let value = metadata.filter(result => result.id == sample);
  
          // Log the array of metadata objects after the have been filtered
          console.log(value)
  
          // Get the first index from the array
          let valueData = value[0];
  
          // Use Object.entries to get the key/value pairs and put into the demographics box on the page
          let washFrequency = Object.values(valueData)[6];
          
          // Set up the trace for the gauge chart
          let trace2 = {
              type: 'pie',
              showlegend: false,
              hole: 0.4,
              rotation: 90,
              value: washFrequency,
              text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 16}
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                  axis: {range: [0,10], tickmode: "linear", tick0: 1, dtick: 1},
                  bar: {color: "black"},
                  steps: [
                      {range: [0, 1], color: "#FFB6C1"},
                      {range: [1, 2], color: "#FFC0CB"},
                      {range: [2, 3], color: "#FFA07A"},
                      {range: [3, 4], color:  "#FA8072"},
                      {range: [4, 5], color:  "#F08080"},
                      {range: [5, 6], color: "#FF7F50"},
                      {range: [6, 7], color: "#FF6347"},
                      {range: [7, 8], color:  "#CD5C5C"},
                      {range: [8, 9], color: "#B22222"},
                      {range: [9, 10], color: "#8B0000"},
                  ]
              } 
          };
  
          // Set up the Layout
          let layout = {
              width: 400, 
              height: 400,
              margin: {t: 0, b:0}
          };
  
          // Call Plotly to plot the gauge chart
          Plotly.newPlot("gauge", [trace2], layout)
      });
  };
  
  // Call the initialize function
  init();