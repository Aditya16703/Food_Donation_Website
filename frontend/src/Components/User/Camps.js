import React, { useState, useEffect } from "react";
import data from "../../assets/data.json";
import axios from "../Api";

const Camps = () => {
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetchCamps(data.states[state].state, data.states[state].districts[district]);
  }, [state, district]);

  const fetchCamps = async (s, d) => {
    try {
      const res = await axios.get(`/camps/${s}/${d}`);
      setCamps(res.data);
    } catch (err) {
      alert("Something went wrong while fetching camps!");
    }
  };

  const register = async (i) => {
    try {
      await axios.put(`/camps/${i}`);
      alert("Registered successfully for this food camp!");
    } catch (e) {
      alert("Something went wrong while registering!");
    }
  };

  return (
    <div className="p-6 dark:bg-gray-bg dark:text-white">
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* STATE DROPDOWN */}
        <div>
          <label htmlFor="state" className="font-semibold leading-8">
            State:<font color="red">*</font>
          </label>
          <select
            name="state"
            id="state"
            onChange={(e) => {
              setState(Number(e.target.value));
              setDistrict(0);
            }}
            className="w-full p-3 text-md border border-silver rounded bg-white dark:bg-gray-dark dark:text-white"
          >
            {data.states.map((e, i) => (
              <option key={i} value={i}>
                {e.state}
              </option>
            ))}
          </select>
        </div>

        {/* DISTRICT DROPDOWN */}
        <div>
          <label htmlFor="district" className="font-semibold leading-8">
            District:<font color="red">*</font>
          </label>
          <select
            name="district"
            id="district"
            onChange={(e) => setDistrict(Number(e.target.value))}
            className="w-full p-3 text-md border border-silver rounded bg-white dark:bg-gray-dark dark:text-white"
          >
            {data.states[state].districts.map((e, i) => (
              <option key={i} value={i}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* CAMPS TABLE */}
        <table className="w-max rounded-md text-center border-collapse border border-gray-dark dark:border-gray-light">
          <thead className="bg-gray-light dark:bg-gray-darkest text-gray-900 dark:text-white">
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
          <tbody className="text-gray-900 dark:text-white">
            {camps.map((e) => (
              <tr key={e._id} className="hover:bg-gray-100 dark:hover:bg-gray-dark">
                <td className="border p-3">{new Date(e.date).toLocaleDateString()}</td>
                <td className="border p-3">{e.name}</td>
                <td className="border p-3">{e.address}</td>
                <td className="border p-3">{e.state}</td>
                <td className="border p-3">{e.district}</td>
                <td className="border p-3">{e.organiser}</td>
                <td className="border p-3">{e.contact}</td>
                <td className="border p-3">{e.startTime + " - " + e.endTime}</td>
                <td className="border p-3">
                  <span
                    className="border px-4 py-2 rounded-md text-blood cursor-pointer hover:bg-blood hover:text-white"
                    onClick={() => register(e._id)}
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
