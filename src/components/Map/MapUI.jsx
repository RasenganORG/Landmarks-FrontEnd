import { useState, useEffect, useRef } from 'react';
// import ModalUI from '../UI/ModalUI';
import classes from './MapUI.module.css';
import { drawerActions } from '../../store/drawer-slice';

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
import { useDispatch } from 'react-redux';

export default function MapUI() {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const popup = useRef();
  const [coordinates, setCoordinates] = useState('');
  const [newMarker, setNewMarker] = useState(
    new Feature({
      geometry: new Point([[]]),
      name: '',
    })
  );

  const [newMarkersLayer] = useState(
    new VectorLayer({
      properties: { name: 'newMarkers' },
      source: new VectorSource({
        features: [newMarker],
      }),
    })
  );

  const closePopup = () => {
    map.getOverlayById('map-popup').setPosition(undefined);
    map.removeLayer(newMarkersLayer);
  };

  const [map] = useState(
    new Map({
      target: '',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          properties: { name: 'existingMarkers' },
          source: new VectorSource({
            // features: [marker],
          }),
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
      map.addLayer(newMarkersLayer);
      dispatch(drawerActions.closeDrawer());
      newMarker.getGeometry().setCoordinates(evt.coordinate);
      // console.log(typeof evt.coordinate);

      setCoordinates(toStringHDMS(toLonLat(evt.coordinate)));
      overlay.setPosition(evt.coordinate);
    });
  }, [map, dispatch]);

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
