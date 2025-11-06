import React, { useState, useEffect } from "react";
import data from "../../assets/data.json";
import axios from "../Api";

const Camps = () => {
  // ------------------ STATES ------------------
  const [state, setState] = useState(0); // Keeps track of the selected state index
  const [district, setDistrict] = useState(0); // Keeps track of the selected district index
  const [camps, setCamps] = useState([]); // Stores list of fetched camps

  // ------------------ FETCH CAMPS ON LOAD OR CHANGE ------------------
  // ❗ Correction: Added [state, district] as dependencies so it runs when either changes
  useEffect(() => {
    fetch(
      data.states[state].state,
      data.states[state].districts[district]
    );
  }, [state, district]); // <-- added dependency array

  // ------------------ FETCH FUNCTION ------------------
  const fetch = async (s, d) => {
    // Fetches camps data from the backend using selected state and district
    // Endpoint format: /camps/{state}/{district}
    try {
      const res = await axios.get(`/camps/${s}/${d}`);
      setCamps(res.data); // Stores fetched data in "camps" array
    } catch (err) {
      alert("Something went wrong while fetching camps!");
    }
  };

  // ------------------ REGISTER FUNCTION ------------------
  const register = async (i) => {
    // Sends a PUT request to register the user for a specific camp (i = camp ID)
    try {
      await axios.put(`/camps/${i}`);
      alert("Registered successfully for this food camp!");
    } catch (e) {
      alert("Something went wrong while registering!");
    }
  };

  // ------------------ RETURN (UI PART) ------------------
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 items-center">
        
        {/* ---------- STATE DROPDOWN ---------- */}
        <div>
          <label htmlFor="state" className="font-semibold leading-8">
            State:<font color="red">*</font>
          </label>
          <select
            name="state"
            id="state"
            onChange={(e) => {
              setState(Number(e.target.value)); // Update state index
              setDistrict(0); // Reset district when state changes
            }}
            className="w-full p-3 text-md border border-silver rounded"
          >
            {data.states.map((e, i) => (
              <option key={i} value={i} selected={state === i}>
                {e.state}
              </option>
            ))}
          </select>
        </div>

        {/* ---------- DISTRICT DROPDOWN ---------- */}
        <div>
          <label htmlFor="district" className="font-semibold leading-8">
            District:<font color="red">*</font>
          </label>
          <select
            name="district"
            id="district"
            onChange={(e) => {
              setDistrict(Number(e.target.value)); // Update district index
            }}
            className="w-full p-3 text-md border border-silver rounded"
          >
            {data.states[state].districts.map((e, i) => (
              <option key={i} value={i} selected={district === i}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* ---------- CAMPS TABLE ---------- */}
        <table className="w-max rounded-md text-center">
          <thead>
            <tr>
              <th className="border p-4 px-4">Date</th>
              <th className="border p-4 px-4">Camp Name</th>
              <th className="border p-4 px-4">Address</th>
              <th className="border p-4 px-4">State</th>
              <th className="border p-4 px-4">District</th>
              <th className="border p-4 px-4">Organiser</th>
              <th className="border p-4 px-4">Contact</th>
              <th className="border p-4 px-4">Time</th>
              <th className="border p-4 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((e) => (
              <tr key={e._id}>
                <td className="border p-3">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="border p-3">{e.name}</td>
                <td className="border p-3">{e.address}</td>
                <td className="border p-3">{e.state}</td>
                <td className="border p-3">{e.district}</td>
                <td className="border p-3">{e.organiser}</td>
                <td className="border p-3">{e.contact}</td>
                <td className="border p-3">
                  <code>{e.startTime + " - " + e.endTime}</code>
                </td>
                <td className="border p-3">
                  <span
                    className="border px-4 py-2 rounded-md text-blood cursor-pointer hover:bg-blood hover:text-white-900"
                    onClick={() => register(e._id)} // When clicked, register user
                  >
                    Register
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Camps;
