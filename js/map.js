
//mapbox token to access its api
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3NlbGxzIiwiYSI6ImNpbnRmb3ZxbTExNmt1a2x5ZXY3MWtudnAifQ.WD0ZIKdBEC4QMPtAl9D8ew';
    // replace this with your access token

//This limits the full extent of the map
    var bounds = [
      [-180.679, -80.60], // Southwest coordinates
      [180.187, 84.549]  // Northeast coordinates
    ];

//adding my mapbox style
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/ksells/cj3ovpbmp004r2rqm5z1lt798',
      center: [0, 30], // starting position
      zoom: 1.25, // starting zoom
      maxBounds: bounds
    });


// Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

//finding the points from my layer that has the GeoJSON infomation
    map.on('click', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        'source-layer': 'PointFinal-cq1bnr',   //it's 'source-layer' not LAYER:
      });

      if (!features.length) {e.point
        return;
      }

      var feature = features[0];

//creating pop up from rendered features, pop up says what the features were

      var popup = new mapboxgl.Popup({ offset: [0, 0] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);

// Change the cursor to a pointer when the mouse is over the places layer.
//for some reason this isn't working..
      map.on('mouseenter', 'Allpoints', function(e) {
          map.getCanvas().style.cursor = 'pointer';
        });

// Change it back to pan when it leaves.
// also not working..
      map.on('mouseleave', function (e) {
          map.getCanvas().style.cursor = '';
          });
    });



//Trying to figure out bookmarks...

  //    var llist = L.control.locationlist({ locationsList : [ {title: 'Poland', latlng: [52.03, 19.27], zoom: 6},
  //  					  {title: 'Other', latlng: [50.04, 14.28], zoom: 6},
  //  					  {title: 'Other2', latlng: [50.04, 19.27], zoom: 12}],
  //  	nextText : '->',
  //  	nextTitle : 'Next',
  //  	prevText : '<-',
  //  	prevTitle : 'Previous',
  //  	showList : true });
