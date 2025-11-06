import React, { useState } from "react";
import axios from "../Api";

const Status = (props) => {
  const [status, setStatus] = useState(props.status);

  const choices = [
    "Pending",
    "Approved",
    "Denied",
    props.handle === "donations" ? "Donated" : "Completed",
  ];

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    try {
      if (newStatus === "Donated") {
        await axios.put("/bank/updateStock", {
          foodGroup: props.foodGroup,
          units: props.units,
        });
        alert("Stock Updated");
      } else if (newStatus === "Completed") {
        await axios.put("/bank/deleteStock", {
          foodGroup: props.foodGroup,
          units: props.units,
        });
        alert("Stock Updated");
      }

      await axios.put(`/bank/${props.handle}`, {
        id: props.id,
        status: newStatus,
      });

      setStatus(newStatus);
      props.setId(props.i);
      props.setStatus(newStatus);
    } catch (error) {
      alert(
        error.response?.status === 404
          ? "Not Enough Food"
          : "Something went wrong"
      );
    }
  };

  // Tailwind classes for each status, including dark mode support
  const statusClass =
    status === "Pending"
      ? "border-metal text-metal dark:border-gray-400 dark:text-gray-300"
      : status === "Approved"
      ? "border-yellowX text-yellowX dark:border-yellow-400 dark:text-yellow-300"
      : status === "Denied"
      ? "border-red text-red dark:border-red-600 dark:text-red-400"
      : "border-green text-green dark:border-green-500 dark:text-green-300";

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={["Denied", "Donated", "Completed"].includes(status)}
      className={`${statusClass} border-2 px-4 py-2 rounded-xl hover:shadow-md cursor-pointer bg-white dark:bg-gray-800`}
    >
      {choices.map((e) => (
        <option key={e} value={e}>
          {e}
        </option>
      ))}
    </select>
  );
};

export default Status;
