import axios from "axios";

export async function getNearByInfos(latitude, longitude) {
  try {
    const query = `
    [out:json];
    (
  node["amenity"="school"](around:3000, ${latitude}, ${longitude});
node["amenity"="hospital"](around:3000, ${latitude}, ${longitude});
node["amenity"="pharmacy"](around:3000, ${latitude}, ${longitude});
node["amenity"="restaurant"](around:3000, ${latitude}, ${longitude});
node["amenity"="bus_station"](around:3000, ${latitude}, ${longitude});
node["amenity"="taxi"](around:3000, ${latitude}, ${longitude});
node["amenity"="marketplace"](around:3000, ${latitude}, ${longitude});

    );
    out body;
  `;
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`
    );

    const data = response.data.elements;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
