const listaDePontos = [];

fetch('http://127.0.0.1:8000/equipamentos/')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao fazer requisição.');
    }
  })
  .then(data => {
    const pontos = data;

    pontos.forEach(ponto => {
      listaDePontos.push({
        latitude: ponto.latitude,
        longitude: ponto.longitude
      });
    });

    console.log(listaDePontos);
  })
  .catch(error => console.log(error));

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnb3JicmVubyIsImEiOiJjbGZnOGc5bWQxYW02M3FvNjA0dnc1eWgwIn0.eWwfydStMZEjKgA2A32zPg';
const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 1
});

map.on('load', function() {
  // cria uma camada de pontos
  map.addLayer({
    'id': 'pontos',
    'type': 'circle',
    'source': {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': listaDePontos.map(function(ponto) {
          return {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [ponto.longitude, ponto.latitude]
            }
          }
        })
      }
    },
    'paint': {
      'circle-radius': 6,
      'circle-color': '#FF0000'
    }
  });
});
