import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Popup = ({ popup, setPopup, data, handle }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";

  // Initialize Mapbox map only when popup opens and data has coordinates
  useEffect(() => {
    if (popup !== -1 && data?.longitude && mapContainer.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [data.longitude, data.latitude],
        zoom: 10.7,
      });

      new mapboxgl.Marker()
        .setLngLat([data.longitude, data.latitude])
        .addTo(mapInstance.current);

      return () => mapInstance.current.remove(); // cleanup on unmount
    }
  }, [popup, data]);

  if (popup === -1 || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-40 overflow-auto p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{handle} Details</h1>
          <i
            onClick={() => setPopup(-1)}
            className="fa-solid fa-circle-xmark text-red-600 fa-xl cursor-pointer hover:opacity-80"
          ></i>
        </div>

        {/* Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {Object.keys(data).map((key) => {
                if (["_id", "longitude", "latitude"].includes(key)) return null;
                return (
                  <tr key={key} className="border-b border-gray-300 dark:border-gray-700">
                    <th className="font-semibold p-3 text-left w-1/3">{key[0].toUpperCase() + key.slice(1)}</th>
                    <td className="p-3">{data[key] || "---"}</td>
                  </tr>
                );
              })}
              {data.longitude && (
                <tr>
                  <th className="font-semibold p-3 text-left">Location</th>
                  <td className="p-3">
                    <div ref={mapContainer} className="w-full h-64 rounded"></div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Popup;
