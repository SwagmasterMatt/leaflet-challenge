# leaflet-challenge

# Project Overview
This project is a web-based application designed to visualize earthquake data across the globe. It utilizes various technologies and libraries including JavaScript, Leaflet.js for mapping, and D3.js for data handling.

# Data Source
The application fetches real-time earthquake data from the USGS (United States Geological Survey) website through their API. Specifically, the API endpoint used provides earthquake data in GeoJSON format for the past month.

# Methodology
# Map Initialization

Leaflet Map: Initializes a Leaflet map with the center of the map set to the coordinates [37.09, -95.71] (centered over the United States) and with a zoom level of 5.
Tile Layer: An OpenStreetMap tile layer is added to the initialized map.

# Data Fetching and Parsing

Data Acquisition: The application fetches the GeoJSON data from the USGS API endpoint.
Data Preparation: Upon fetching, it extracts the features (i.e., the earthquake events) from the GeoJSON object.

# Data Filtering

Null or NaN Magnitude: The code filters out events that have null or NaN magnitude or those with a magnitude less than 0.001.
Data Visualization
Circle Markers: For each earthquake event, a circle marker is added to the map. The marker's location is based on the latitude and longitude from the data.
Color Coding: The color of each marker is determined based on the depth of the earthquake, following a predefined color scale.
Radius: The radius of each circle marker is proportional to the magnitude of the earthquake.
Popup Info: When clicked, each marker displays a popup containing details such as the location, magnitude, and date of the earthquake. A link to further event details is also provided.

# Legend Creation
Static Legend: A static legend is added to the bottom right of the map to interpret the depth-based color-coding scheme for the markers.
By integrating the aforementioned components, this application serves as a comprehensive tool for visualizing and understanding real-time earthquake occurrences across the globe.
