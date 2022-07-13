import 'ol/ol.css';
import { useState, useEffect, useRef } from 'react';
import { Map, View, Overlay, Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// import ModalUI from '../UI/ModalUI';

const marker = new Feature({
  geometry: new Point([[]]),
});

const vectorSource = new VectorSource({
  features: [marker],
});

export default function MapUI() {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  // const vectorLayer = ;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat([26.08, 44.46]),
        zoom: 15,
        minZoom: 10,
        maxZoom: 20,
      }),
    });
    setMap(initialMap);
  }, []);

  useEffect(() => {
    map?.on('singleclick', function (evt) {
      marker.getGeometry().setCoordinates(evt.coordinate);
      console.log(evt.coordinate);
    });
  }, [map]);

  // map.on('singleclick', function (evt) {
  //   const coordinate = evt.coordinate;
  //   const hdms = toStringHDMS(toLonLat(coordinate));

  //   // content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  //   console.log(`You clicked here: ${hdms}`);
  //   overlay.setPosition(coordinate);
  // });

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      ref={mapElement}
      className='map-container'
    />
  );
}
