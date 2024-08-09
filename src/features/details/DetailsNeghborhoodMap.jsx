import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

function DetailsNeghborhoodMap({ home }) {
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="h-[400px] w-full mt-4">
      <MapContainer
        center={[home.address.latitude, home.address.longitude]}
        zoom={19}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          position={[home.address.latitude, home.address.longitude]}
          key={home.id}
          icon={customIcon}
        >
          <Popup>
            <div>
              <img src={home?.image[11] || home.image[0]} />
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default DetailsNeghborhoodMap;
