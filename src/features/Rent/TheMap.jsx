import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { handleHouses } from "./handleHouses";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";

function TheMap() {
  const { houses } = handleHouses(); //custom hook

  if (!houses) return <LoadingSpinner />;
  return (
    <MapContainer
      center={[8.7575, 38.9941]}
      zoom={7}
      className="sm:h-full h-96  w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {houses.map((house) => (
        <Marker
          position={[house.address.latitude, house.address.longitude]}
          key={house.id}
        >
          <Popup>
            <div className="space-y-2">
              <div className="space-y-1 text-base px-2 py-1 ">
                <p className="font-bold">{house.title}</p>
                <p> {house.bedRooms} Beds</p>
                <p> {house.price} Birr</p>
              </div>
              <div className="text-sm flex justify-around border-t  h-[25px] items-center border-t-gray-400">
                <p>{house.phoneNumber}</p>
                <div className=" w-px h-full bg-gray-400 "></div>

                <Link
                  to={`${house.id}`}
                  className="text-base text-blue-400 hover:text-blue-500
                  transition-full duration-200"
                >
                  see more
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default TheMap;
