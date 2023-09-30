const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Initialize Map
const myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function getColor(depth) {
    return depth > 90 ? '#8B0000' : // Dark Red (Deepest)
           depth > 80 ? '#B22222' : // Firebrick
           depth > 70 ? '#4169E1' : // Royal Blue
           depth >  60 ? '#0000FF' : // Blue
           depth >  40 ? '#9400D3' : // Dark Violet
           depth >  25 ? '#8A2BE2' : // Blue Violet
           depth >  15 ? '#BA55D3' : // Medium Orchid
           depth >  5 ? '#DA70D6' : // Orchid
           depth > -10 ? '#EE82EE' : // Violet
                         '#FFC0CB';  // Light Pink (Shallowest)
}




// Get Earthquake Data
d3.json(url).then(function(data) {
   const features = data.features;



   // Create circle markers
   for (let i = 0; i < features.length; i++) {
    // check for a null or naan magnitude
    if (features[i].properties.mag === null || isNaN(features[i].properties.mag) || features[i].properties.mag < 0.001) {
      continue;
    }
    const geometry = features[i].geometry;
    const properties = features[i].properties;
    const depth = geometry.coordinates[2];
    const magnitude = properties.mag;
    // Convert unix timestamp to date
    const date = new Date(properties.time).toLocaleDateString("en-US");
    const eventURL = properties.url;

    // Add circles to the map.
    L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
      fillOpacity: 0.2,
      color: "black",
      weight: 0.5,
      fillColor: getColor(depth),
      radius: magnitude * 15000 * 0.5
    }).bindPopup(`<h1>${properties.place}</h1> <hr> <h3>Magnitude: ${magnitude}</h3> <h4>Date: ${date}</h4> <a href="${eventURL}" target="_blank">Event Details</a>`).addTo(myMap);
  }

    

});

// Create static legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'; // White background with 70% opacity
    const depth = [-10, 5, 15, 25, 40, 60, 70, 80, 90];

  // Loop through the depth intervals and generate a label with a colored square for each interval
  for (let i = 0; i < depth.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(depth[i] + 1) + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
      depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

  return div;
};
legend.addTo(myMap);