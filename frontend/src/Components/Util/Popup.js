import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Popup = ({ popup, setPopup, data, handle }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  // Token assignment removed for push
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2R1bW15In0.dummy";

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
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 md:p-8 animate-fade-in">
      <div 
        className="absolute inset-0 bg-secondary-900/60 backdrop-blur-md"
        onClick={() => setPopup(-1)}
      ></div>
      
      <div className="relative w-full max-w-4xl glass dark:glass-dark rounded-[3rem] shadow-premium border border-white-900/20 overflow-hidden animate-scale-in">
        <div className="flex justify-between items-center p-8 border-b border-secondary-100 dark:border-secondary-800">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-1 bg-primary-600 rounded-full"></div>
            <div>
                <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white-900">{handle} Profile</h1>
                <p className="text-xs font-bold text-secondary-400 uppercase tracking-widest mt-0.5">Verified Entity Details</p>
            </div>
          </div>
          <button
            onClick={() => setPopup(-1)}
            className="h-12 w-12 rounded-2xl bg-secondary-100 dark:bg-secondary-800 text-secondary-500 hover:text-error hover:bg-error/10 transition-all active:scale-95 flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8 md:p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    {Object.keys(data).map((key) => {
                        if (["_id", "longitude", "latitude", "__v", "password", "history"].includes(key.toLowerCase())) return null;
                        return (
                            <div key={key} className="p-4 rounded-2xl bg-secondary-50/50 dark:bg-white-100/5 border border-secondary-100 dark:border-secondary-800">
                                <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest block mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-secondary-900 dark:text-white-900 font-bold">
                                    {data[key] || "---"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                {data.longitude ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-secondary-500">
                            <i className="fa-solid fa-map-location-dot"></i>
                            <span className="text-xs font-bold uppercase tracking-wider">Geographical Location</span>
                        </div>
                        <div className="relative group">
                            <div ref={mapContainer} className="w-full h-[320px] rounded-[2rem] border-4 border-white-900 dark:border-secondary-800 shadow-xl overflow-hidden"></div>
                            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                        </div>
                        <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-900/30">
                            <div className="flex items-start space-x-3">
                                <i className="fa-solid fa-circle-info text-primary-600 mt-1"></i>
                                <p className="text-xs text-primary-800 dark:text-primary-300 leading-relaxed font-medium">
                                    Coordinates: {data.latitude.toFixed(4)}° N, {data.longitude.toFixed(4)}° E. You can visit this facility during operational hours using the map above.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-4 border-2 border-dashed border-secondary-200 dark:border-secondary-800 rounded-[2rem]">
                         <div className="h-16 w-16 bg-secondary-50 rounded-full flex items-center justify-center text-secondary-300">
                            <i className="fa-solid fa-map-pin text-2xl"></i>
                         </div>
                         <p className="text-secondary-500 font-medium">No location data available for this entry.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-secondary-50/50 dark:bg-white-100/5 border-t border-secondary-100 dark:border-secondary-800 text-center">
            <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-[0.2em]">Annadata Secure Transparency System • 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
