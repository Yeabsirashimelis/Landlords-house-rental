import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function DetailsNeghborhoodMap({ home }) {
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
