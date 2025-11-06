import React, { useState, useEffect } from "react";
import axios from "../Api";
import CampEdit from "./CampEdit";

const Camps = () => {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(-1);

  useEffect(() => {
    axios
      .get("/camps")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Something went wrong in Bank camps.js");
      });
  }, []);

  return (
    <div className="mt-5 ml-5 dark:text-white">
      <table className="rounded-md text-center border-collapse border border-gray-400 dark:border-gray-600 w-full">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
          <tr>
            <th className="border p-4 px-4">Date</th>
            <th className="border p-4 px-4">Camp Name</th>
            <th className="border p-4 px-4">Address</th>
            <th className="border p-4 px-4">State</th>
            <th className="border p-4 px-4">District</th>
            <th className="border p-4 px-4">Organizer</th>
            <th className="border p-4 px-4">Contact</th>
            <th className="border p-4 px-4">Time</th>
            <th className="border p-4 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark text-gray-900 dark:text-white">
          {data.map((e, i) => (
            <tr key={i}>
              <td className="border p-3">{new Date(e.date).toLocaleDateString()}</td>
              <td className="border p-3">{e.name}</td>
              <td className="border p-3">{e.address}</td>
              <td className="border p-3">{e.state}</td>
              <td className="border p-3">{e.district}</td>
              <td className="border p-3">{e.organizer}</td>
              <td className="border p-3">{e.contact}</td>
              <td className="border p-3">
                <code>{e.startTime + "-" + e.endTime}</code>
              </td>
              <td className="border p-3">
                <span
                  className="text-purple cursor-pointer hover:underline"
                  onClick={() => setPopup(i)}
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popup !== -1 && <CampEdit popup={popup} setPopup={setPopup} data={data[popup]} />}
    </div>
  );
};

export default Camps;
