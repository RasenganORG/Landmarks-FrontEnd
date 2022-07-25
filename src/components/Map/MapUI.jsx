import { useState, useEffect, useRef } from 'react';
// import ModalUI from '../UI/ModalUI';
import classes from './MapUI.module.css';

import 'ol/ol.css';
import { Map, View, Overlay, Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import PopUp from './PopUp';

const marker = new Feature({
  geometry: new Point([[]]),
});

const vectorSource = new VectorSource({
  features: [marker],
});

export default function MapUI() {
  const mapRef = useRef();
  const popup = useRef();
  const [coordinates, setCoordinates] = useState('');

  const closePopup = () => {
    map.getOverlayById('map-popup').setPosition(undefined);
  };

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
      view: new View({
        center: fromLonLat([26.08, 44.46]),
        zoom: 15,
        minZoom: 10,
        maxZoom: 20,
      }),
    })
  );

  useEffect(() => {
    const overlay = new Overlay({
      element: popup.current,
      id: 'map-popup',
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    // console.log('useEffect in MapUI.jsx');

    map.addOverlay(overlay);
    map.setTarget(mapRef.current);
    map.on('singleclick', function (evt) {
      marker.getGeometry().setCoordinates(evt.coordinate);
      // console.log(evt.coordinate);

      setCoordinates(toStringHDMS(toLonLat(evt.coordinate)));
      overlay.setPosition(evt.coordinate);
    });
  }, [map]);

  return (
    <>
      <div
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className='map-container'
      />
      <div id='map-popup' className={classes['ol-popup']} ref={popup}>
        <PopUp coordinates={coordinates} closePopup={closePopup} />
      </div>
    </>
  );
}
