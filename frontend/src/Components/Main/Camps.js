import React, { useState, useEffect } from "react";
import data from "../../assets/data.json";
import axios from "../Api";

const Camps = () => {
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        `/camps/allCamps/${data.states[state].state}/${data.states[state].districts[district]}/${date}`
      )
      .then((res) => {
        setFiltered(res.data);
        setError("");
      })
      .catch(() => setError("⚠️ Failed to fetch camp data."));
  }, [state, district, date]);

  return (
    <div className="px-4 md:px-10 py-6 w-full overflow-x-auto">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div>
          <label htmlFor="state" className="font-semibold block mb-1">
            State:<span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => {
              setState(Number(e.target.value));
              setDistrict(0);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {data.states.map((e, i) => (
              <option key={i} value={i}>
                {e.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="district" className="font-semibold block mb-1">
            District:<span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            value={district}
            onChange={(e) => setDistrict(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {data.states[state].districts.map((d, i) => (
              <option key={i} value={i}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="font-semibold block mb-1">
            Date:<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Error or Data Table */}
      {error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 italic">No camps found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center text-sm md:text-md">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Date",
                  "Camp Name",
                  "Address",
                  "State",
                  "District",
                  "Contact",
                  "Conducted By",
                  "Organized By",
                  "Time",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="p-3 font-semibold border border-gray-300"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-300">{e.name}</td>
                  <td className="p-3 border border-gray-300">{e.address}</td>
                  <td className="p-3 border border-gray-300">{e.state}</td>
                  <td className="p-3 border border-gray-300">{e.district}</td>
                  <td className="p-3 border border-gray-300">{e.contact}</td>
                  <td className="p-3 border border-gray-300">{e.bankId?.name}</td>
                  <td className="p-3 border border-gray-300">{e.organizer}</td>
                  <td className="p-3 border border-gray-300">
                    <code>
                      {e.startTime} - {e.endTime}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Camps;
