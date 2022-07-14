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
  const mapRef = useRef();
  const popup = useRef();
  const popupContent = useRef();

  const overlay = new Overlay({
    element: popup.current,
    id: 'map-popup',
    // autoPan: {
    //   animation: {
    //     duration: 250,
    //   },
    // },
  });

  const [map] = useState(
    new Map({
      target: '',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([26.08, 44.46]),
        zoom: 15,
        minZoom: 10,
        maxZoom: 20,
      }),
    })
  );

  useEffect(() => {
    //   setMap(initialMap);
    map.setTarget(mapRef.current);
    map.on('singleclick', function (evt) {
      // marker.getGeometry().setCoordinates(evt.coordinate);
      // console.log(overlay.element);
      console.log(evt.coordinate);
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      const content = popupContent.current;
      // console.log('content', content);
      content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
      overlay.setPosition(coordinate);
    });
  }, [map]);

  return (
    <>
      <div
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className='map-container'
      />
      <div id='map-popup' ref={popup}>
        <div id='map-popup-content' ref={popupContent}></div>
      </div>
    </>
  );
}
