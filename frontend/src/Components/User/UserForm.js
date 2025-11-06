import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; //  merged both imports in one line
import data from "../../assets/data.json";
import axios from "../Api";
import BanksSearch from "./BanksSearch";
import AuthContext from "../context/AuthContext";

const UserForm = () => {
  const { handle } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // initialized correct state types
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [desc, setDesc] = useState("");
  const [bank, setBank] = useState("");
  const [food, setFood] = useState(0);
  const [state, setState] = useState(0);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [district, setDistrict] = useState(0);
  const [me, setMe] = useState(false);

  const foodGroups = [
    "Non-Perishable Food",
    "Perishable Food",
    "Prepared Food",
    "Baby Food and Formula",
    "Snacks and Beverages",
  ];

  //  Added handle in dependency array to ensure recheck when it changes
  useEffect(() => {
    if (handle === "donate") {
      setMe(true);
    }
  }, [handle]);

  //  Safely populate fields when "me" becomes true
  useEffect(() => {
    if (me && user) {
      setName(user.name || "");
      setFood(foodGroups.indexOf(user.foodGroup) || 0);
      setAge(user.age || "");
      setGender(user.gender || "male");
    }
  }, [me, user]);

  //  Donate function
  const donate = () => {
    const formData = {
      bankId: bank,
      units,
      disease: desc,
    };

    axios
      .post("/user/donate", formData, { withCredentials: true })
      .then(() => {
        alert("Donation request sent successfully");
        navigate("/user/donations");
      })
      .catch(() => alert("Something went wrong"));
  };

  //  Request function
  const request = () => {
    const formData = {
      bankId: bank,
      name,
      foodGroup: foodGroups[food],
      age,
      gender,
      units,
      reason: desc,
    };
    axios
      .post("/user/request", formData, { withCredentials: true })
      .then(() => {
        alert("Food request sent successfully");
        navigate("/user/requests");
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <div className="p-6 w-full">
      <form
        className="space-y-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (bank === "") {
            alert("Select a Food bank");
            return;
          }
          handle === "donate" ? donate() : request();
        }}
      >
        <fieldset className="border border-solid border-gray-300 p-3">
          {/*  changed class → className */}
          <legend className="text-2xl font-bold">
            &nbsp;{handle === "donate" ? "Donate Food" : "Make Food Request"}&nbsp;
          </legend>

          {handle === "request" && (
            <div className="text-right">
              {/* Changed <legend> to <div> (nested legend not valid HTML) */}
              <input
                type="checkbox"
                id="me"
                checked={me}
                onChange={() => setMe(!me)} // fixed controlled checkbox
              />
              <label htmlFor="me"> For me</label>
            </div>
          )}

          <table className="w-full" cellPadding={10}>
            <tbody>
              <tr>
                <td>
                  <label className="font-semibold leading-8">
                    {handle === "request" && "Patient "}Name:
                    <font color="red">*</font>
                  </label>
                  <input
                    className="w-full p-3 text-md border border-silver rounded"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    disabled={me || handle === "donate"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>

                <td>
                  <label htmlFor="food" className="font-semibold leading-8">
                    Food Group:<font color="red">*</font>
                  </label>
                  <select
                    name="food"
                    value={food} //  used value instead of selected
                    onChange={(e) => setFood(Number(e.target.value))}
                    disabled={me || handle === "donate"}
                    className="w-full p-3 text-md border border-silver rounded"
                  >
                    {foodGroups.map((item, i) => (
                      <option key={i} value={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              {handle === "request" && (
                <tr>
                  <td>
                    <label className="font-semibold leading-8">
                      Age:<font color="red">*</font>
                    </label>
                    <input
                      className="w-full p-3 text-md border border-silver rounded"
                      type="number"
                      placeholder="Enter your age"
                      required
                      value={age}
                      min={1}
                      disabled={me}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </td>

                  <td>
                    <label htmlFor="gender" className="font-semibold leading-8">
                      Gender:<font color="red">*</font>
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={gender} //  used value instead of selected
                      disabled={me}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-3 text-md border border-silver rounded"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </td>
                </tr>
              )}

              <tr>
                <td>
                  <label className="font-semibold leading-8">
                    Units (in kg):<font color="red">*</font>
                  </label>
                  <input
                    className="w-full p-3 text-md border border-silver rounded"
                    type="number"
                    min={1}
                    max={1000}
                    required
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  />
                </td>

                <td colSpan={2}>
                  <label htmlFor="desc" className="font-semibold leading-8">
                    {handle === "donate" ? "Disease (if any):" : "Reason:"}
                  </label>
                  <input
                    className="w-full p-3 text-md border border-silver rounded"
                    name="desc"
                    type="text"
                    value={desc} // added value for controlled input
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="state" className="font-semibold leading-8">
                    State:<font color="red">*</font>
                  </label>
                  <select
                    name="state"
                    id="state"
                    value={state} //  used controlled value
                    onChange={(e) => {
                      setState(Number(e.target.value));
                      setDistrict(0);
                    }}
                    className="w-full p-3 text-md border border-silver rounded"
                  >
                    {data.states.map((s, i) => (
                      <option key={i} value={i}>
                        {s.state}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <label htmlFor="district" className="font-semibold leading-8">
                    District:<font color="red">*</font>
                  </label>
                  <select
                    name="district"
                    id="district"
                    value={district} //  used controlled value
                    onChange={(e) => setDistrict(Number(e.target.value))}
                    className="w-full p-3 text-md border border-silver rounded"
                  >
                    {data.states[state].districts.map((d, i) => (
                      <option key={i} value={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <BanksSearch
            state={data.states[state].state}
            district={data.states[state].districts[district]}
            setBank={setBank}
          />

          <button
            type="submit"
            className="block mx-auto my-2 mt-4 w-4/12 px-9 py-2 bg-blood text-white hover:bg-gray-darkest rounded-full text-lg font-bold"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default UserForm;
