import React, { useState, useEffect } from "react";
import axios from "../Api";
import mapboxgl from "mapbox-gl";
import Popup from "../Util/Popup";

// --------------------------- MAPBOX TOKEN ---------------------------
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";

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
    <div className="mx-2 mt-3">
      {/* --------------------------- BANKS TABLE --------------------------- */}
      <table className="border w-full text-center rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="border bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4">
              Food Bank
            </th>
            <th className="border bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4">
              Parent Organisation
            </th>
            <th className="border bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4">
              Category
            </th>
            <th className="border bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4">
              Address
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((bank, i) => {
              const isSelected = selected === i;
              return (
                <tr
                  key={bank._id}
                  className={`cursor-pointer ${
                    isSelected
                      ? "bg-red-600 text-white dark:bg-red-700 dark:text-white"
                      : "hover:bg-red-100 dark:hover:bg-red-800 hover:text-black dark:hover:text-white"
                  }`}
                  onClick={() => {
                    setSelected(isSelected ? -1 : i);
                    setBank(isSelected ? "" : bank._id);
                  }}
                >
                  <td className="py-2 px-4 border">{bank.name}</td>
                  <td className="py-2 px-4 border">{bank.organisation}</td>
                  <td className="py-2 px-4 border">{bank.category}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex justify-between items-center">
                      <div className="w-full">{bank.address}</div>
                      <div className="flex items-center">
                        <i
                          className="fa-solid fa-circle-info fa-lg cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            setPopup(i);
                          }}
                        ></i>
                        &nbsp;&nbsp;&nbsp;
                        {isSelected ? (
                          <i className="fa-regular fa-circle-check fa-lg"></i>
                        ) : (
                          <i className="fa-regular fa-circle fa-lg"></i>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center text-md font-bold py-6 dark:text-white"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

