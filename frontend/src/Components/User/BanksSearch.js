import React, { useState, useEffect } from "react";
import axios from "../Api";
import mapboxgl from "mapbox-gl";
import Popup from "../Util/Popup";

// --------------------------- COMPONENT PURPOSE ---------------------------
// The BanksSearch component allows users to select a food bank (or multiple)
// to donate food. It fetches available banks based on user's location (state, district)
// and allows the user to click/select one. It also supports a popup with extra info.
const BanksSearch = (props) => {
  // --------------------------- STATES ---------------------------
  const [popup, setPopup] = useState(-1); // controls which popup (if any) is open
  const [data, setData] = useState([]); // stores list of available banks
  const [selected, setSelected] = useState(-1); // keeps track of selected bank row

  // --------------------------- FETCH BANKS DATA ---------------------------
  // When state or district (props) changes, send POST request to get available banks.
  useEffect(() => {
    axios
      .post("/bank/user", props, { withCredentials: true })
      .then(async (res) => {
        setData(res.data); // store response data in 'data' state
      })
      .catch((error) => {
        setData([]); // if request fails, clear data
      });
  }, [props.state, props.district]); // runs every time user changes location filters

  // --------------------------- MAPBOX TOKEN ---------------------------
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";

  // --------------------------- RETURN (UI PART) ---------------------------
  return (
    <div className="mx-2 mt-3">
      {/* --------------------------- BANKS TABLE --------------------------- */}
      <table className="border w-full text-center">
        <thead>
          <tr>
            <th className="border">Food Bank</th>
            <th className="border">Parent Organisation</th>
            <th className="border">Category</th>
            <th className="border">Address</th>
          </tr>
        </thead>

        <tbody className="p-3">
          {/* If data is available, show table rows */}
          {data.length ? (
            data.map((e, i) => (
              <tr
                key={i}
                className={`hover:bg-red hover:text-white-900 p-3 cursor-pointer ${
                  selected === i ? "bg-red text-white-900" : ""
                }`} // Highlight selected row
                onClick={() => {
                  // Toggle row selection
                  // If already selected → deselect it
                  // If new row → select it
                  const isSelected = selected === i;
                  setSelected(isSelected ? -1 : i);
                  props.setBank(isSelected ? "" : e._id); // pass selected bank ID to parent
                }}
              >
                {/* Each column shows info about the food bank */}
                <td className="py-2 px-4 border">{e.name}</td>
                <td className="py-2 px-4 border">{e.organisation}</td>
                <td className="py-2 px-4 border">{e.category}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-between items-center">
                    <div className="w-full">{e.address}</div>
                    <div className="flex items-center">
                      &nbsp;&nbsp;
                      {/* Info icon opens popup with detailed info */}
                      <i
                        className="fa-solid fa-circle-info fa-lg cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation(); // stop click from selecting the row
                          setPopup(i); // open popup for this row
                        }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;
                      {/* Show check icon if selected */}
                      {selected === i ? (
                        <i className="fa-regular fa-circle-check fa-lg"></i>
                      ) : (
                        <i className="fa-regular fa-circle fa-lg"></i>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            // If no data found
            <tr>
              <td colSpan={4} className="text-center text-md font-bold my-6">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* --------------------------- POPUP COMPONENT --------------------------- */}
      {/* Displays additional info for the selected bank */}
      <Popup
        popup={popup} // which popup to show (-1 = none)
        setPopup={setPopup} // function to close popup
        data={data[popup]} // send bank data to popup
        handle="Food Bank" // heading for popup
      />
    </div>
  );
};

export default BanksSearch;
