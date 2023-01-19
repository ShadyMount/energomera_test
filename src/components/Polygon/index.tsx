/* eslint-disable react/jsx-props-no-spreading */
import { Geometry, Position } from "geojson";
import { Layer, Marker, Source, LayerProps } from "react-map-gl";
import styles from "./styles.module.css";

export interface IPolygon {
  $id: string;
  Id: number;
  Name: string;
  Size: number;
  IsRemoved: boolean;
  SyncId: string;
  Location: string;
  OrganizationId: number;
  SyncDate: string;
}
type LocationT = {
  Center: [number, number];
  Polygon: Position[];
};
function Polygon({ Location, Name }: IPolygon) {
  const object: LocationT = JSON.parse(Location);
  const geojson: Geometry = {
    type: "Polygon",
    coordinates: [object.Polygon],
  };

  const layerStyle: LayerProps = {
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#fff",
      "line-width": 3,
    },
  };
  return (
    <Source type="geojson" data={geojson}>
      <Layer {...layerStyle} />
      <Marker
        longitude={object.Center[0]}
        latitude={object.Center[1]}
        anchor="center"
      >
        <div className={styles.marker}>{Name}</div>
      </Marker>
    </Source>
  );
}

export default Polygon;
