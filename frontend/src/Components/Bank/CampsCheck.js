import React, { useState } from "react";
import axios from "../Api";

const CampsCheck = (props) => {
  const [edit, setEdit] = useState(true);
  const [units, setUnits] = useState(props.data.units);
  const [status, setStatus] = useState(props.data.status);

  (() => {
    props.data._id.units = props.data.units;
    props.data._id.status = props.data.status === 0 ? "Pending" : "Donated";
  })();

  return (
    <div className="border-2 border-blood shadow-md p-4 text-lg w-max rounded-xl bg-white dark:bg-gray-dark text-gray-900 dark:text-white">
      <table>
        <tbody>
          <tr>
            <td>{props.data._id.name}</td>
            <td className="pl-4">
              {edit ? (
                <>{props.data.units}</>
              ) : (
                <input
                  type="number"
                  min={1}
                  max={250}
                  className="w-12 text-gray-900 dark:text-white bg-white dark:bg-gray-dark border border-gray-400 dark:border-gray-600 rounded px-1"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                />
              )}
              mL
            </td>
          </tr>
          <tr>
            <td>
              {props.data._id.bloodGroup} | {props.data._id.age}yrs
            </td>
            <td className="text-right">
              &nbsp;&nbsp;&nbsp;
              {edit ? (
                <>
                  <i
                    className="fa-solid text-metal dark:text-yellow fa-circle-info cursor-pointer"
                    onClick={() => {
                      props.setPopup(props.popup === -1 ? 1 : -1);
                      props.setSent(props.data._id);
                    }}
                  ></i>{" "}
                  &nbsp;
                  {status === 0 && (
                    <i
                      className="fa-solid text-green fa-pen-to-square cursor-pointer"
                      onClick={() => setEdit(false)}
                    ></i>
                  )}
                </>
              ) : (
                <>
                  <i
                    className="fa-solid text-green fa-check cursor-pointer"
                    onClick={async () => {
                      await axios
                        .put(
                          `/camps/${props.camp}/${props.data._id._id}`,
                          { units: units },
                          { withCredentials: true }
                        )
                        .then((r) => {
                          alert("Updated");
                          props.data.units = units;
                          props.data.status = 1;
                          setUnits(units);
                          setStatus(1);
                          setEdit(true);
                        })
                        .catch((e) => {
                          alert("Something went wrong in Bank CampsCheck.js");
                        });
                    }}
                  ></i>{" "}
                  &nbsp;
                  <i
                    className="fa-solid fa-xmark text-blood cursor-pointer"
                    onClick={() => setEdit(true)}
                  ></i>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CampsCheck;
