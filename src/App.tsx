/* eslint-disable react/jsx-props-no-spreading */
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl";
import maplibregl from "maplibre-gl";
import useSWR from "swr";
import Polygon, { IPolygon } from "./components/Polygon";

function App() {
  const fetcher = (url: RequestInfo | URL, init?: RequestInit) =>
    fetch(url, init).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://agro.energomera.ru:3060/api/field?lastChangeDate=2022-01-01T10:00:00.000&skip=0&take=100",
    fetcher
  );
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: 45.3385364852744, // либо центр первого полигона
        latitude: 42.50865653359858,
        zoom: 12,
      }}
      style={{ width: 1200, height: 800 }}
      mapStyle={`https://api.maptiler.com/maps/hybrid/style.json?key=${
        import.meta.env.VITE_API_KEY
      }`}
    >
      {data.map((e: IPolygon) => (
        <Polygon key={e.$id} {...e} />
      ))}
    </Map>
  );
}

export default App;
