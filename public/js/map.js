mapboxgl.accessToken = 'pk.eyJ1Ijoid2luZ21hbjciLCJhIjoiY2toajRpbTFyMHgxazJycDY3Nm5yaTJ3ZSJ9.5h1ELLHB3rc6uLjAt1jU9g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [77.28919, 
    28.43435]
});

// Fetch stores from API
async function getRestaurants() {
  const res = await fetch('/api/v1/restaurants');
  const data = await res.json();

  const restaurants = data.data.map(restaurant => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          restaurant.location.coordinates[0],
          restaurant.location.coordinates[1]
        ]
      },
      properties: {
        name: restaurant.name,
        icon: 'restaurant'
      }
    };
  });

  loadMap(restaurants);
}

// Load map with restaurants
function loadMap(restaurants) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: restaurants
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{name}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getRestaurants();