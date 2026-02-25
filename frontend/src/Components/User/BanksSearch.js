import React, { useState, useEffect } from "react";
import axios from "../Api";
import mapboxgl from "mapbox-gl";
import Popup from "../Util/Popup";

// --------------------------- MAPBOX TOKEN ---------------------------
// Token assignment removed for push
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2R1bW15In0.dummy";

// --------------------------- COMPONENT ---------------------------
const BanksSearch = ({ state, district, setBank }) => {
  const [popup, setPopup] = useState(-1); // Which popup is open
  const [data, setData] = useState([]);   // List of banks
  const [selected, setSelected] = useState(-1); // Selected bank row

  // --------------------------- FETCH BANKS DATA ---------------------------
  useEffect(() => {
    axios
      .post("/bank/user", { state, district }, { withCredentials: true })
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, [state, district]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.length > 0 ? (
          data.map((bank, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={bank._id}
                onClick={() => {
                  setSelected(isSelected ? -1 : i);
                  setBank(isSelected ? "" : bank._id);
                }}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-primary-600 border-primary-500 shadow-xl shadow-primary-500/20 translate-y-[-4px]"
                    : "bg-white-100/40 dark:bg-secondary-900/40 border-white-900/20 hover:border-primary-500/50 hover:bg-white-100/60 dark:hover:bg-secondary-900/60"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center text-xl">
                      <i className="fa-solid fa-building-columns"></i>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setPopup(i);
                        }}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? "text-white-900/80 hover:text-white-900" : "text-secondary-400 hover:text-primary-600"
                        }`}
                      >
                        <i className="fa-solid fa-circle-info text-lg"></i>
                      </button>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? "bg-white-100 border-white-900 text-primary-600 scale-110" 
                          : "border-secondary-300 dark:border-secondary-700"
                      }`}>
                        {isSelected && <i className="fa-solid fa-check text-[10px] font-black"></i>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg font-bold transition-colors ${isSelected ? "text-white-900" : "text-secondary-900 dark:text-white-900"}`}>
                      {bank.name}
                    </h4>
                    <p className={`text-xs font-medium mt-1 transition-colors ${isSelected ? "text-white-900/80" : "text-secondary-500 dark:text-white-400"}`}>
                        {bank.organisation} • <span className="uppercase tracking-wider">{bank.category}</span>
                    </p>
                    <div className={`mt-4 pt-4 border-t flex items-start space-x-2 transition-colors ${
                        isSelected ? "border-white-900/10 text-white-900/70" : "border-secondary-100 dark:border-secondary-800 text-secondary-500 dark:text-white-400"
                    }`}>
                        <i className="fa-solid fa-location-dot mt-0.5 text-[10px]"></i>
                        <span className="text-xs leading-relaxed line-clamp-2">{bank.address}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative background element for selected state */}
                {isSelected && (
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-white-100/10 rounded-full blur-2xl"></div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4 glass dark:glass-dark rounded-[2.5rem] border border-dashed border-secondary-300 dark:border-secondary-700">
            <div className="h-16 w-16 bg-secondary-100 dark:bg-secondary-800/50 text-secondary-400 rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div>
              <p className="font-bold text-secondary-700 dark:text-white-300">No Food Banks Found</p>
              <p className="text-sm text-secondary-400">Try adjusting your filters for state or district.</p>
            </div>
          </div>
        )}
      </div>

      {/* --------------------------- POPUP --------------------------- */}
      {popup !== -1 && data[popup] && (
        <Popup
          popup={popup}
          setPopup={setPopup}
          data={data[popup]}
          handle="Food Bank"
        />
      )}
    </div>
  );
};

export default BanksSearch;

