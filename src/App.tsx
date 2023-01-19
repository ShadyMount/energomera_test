/* eslint-disable react/jsx-props-no-spreading */
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";

function App() {
  // const TestMap = new maplibregl.Map({
  //   container: "map",
  //   style: "https://demotiles.maplibre.org/style.json", // stylesheet location
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9, // starting zoom
  // });
  const geojson: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.4, 37.8] },
      },
    ],
  };

  const layerStyle: any = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };
  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle={`https://api.maptiler.com/maps/hybrid/style.json?key=${
        import.meta.env.VITE_API_KEY
      }`}
    >
      <Source type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}

export default App;
