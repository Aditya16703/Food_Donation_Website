import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json"; // State & district data
import { useParams } from "react-router-dom";
import axios from "../Api"; // Custom axios instance
import AuthContext from "../context/AuthContext"; // Context for authentication

const EditProfile = () => {
  const { handle } = useParams(); // To get parameter from URL if needed
  const { getLoggedIn, user } = useContext(AuthContext); // Access logged-in user info & refresh function

  // Form state variables
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const [food, setFood] = useState(0);
  const [edit, setEdit] = useState(true); // Used to toggle edit/view mode

  // Different food donation categories
  const foodGroups = [
    "Non-Perishable Food",
    "Perishable Food",
    "Prepared Food",
    "Baby Food and Formula",
    "Snacks and Beverages",
  ];

  // ---------------------- USE EFFECT ----------------------
  // Runs once when the component loads
  useEffect(() => {
    // Prefill form with user data
    setName(user.name);
    setAge(user.age);
    setGender(user.gender);
    setMail(user.email);
    setPhone(user.phone);

    // Find indexes of user's state and district
    data.states.forEach((e, i) => {
      if (e.state === user.state) {
        setState(i); // Match state
        setDistrict(e.districts.indexOf(user.district)); // Match district
      }
    });

    // Set default dummy password for display (not editable)
    setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
    setAddress(user.address);
    setFood(foodGroups.indexOf(user.foodGroup));
  }, [user]); // Added dependency 'user' for safer data loading
  // -------------------------------------------------------

  // ---------------------- UPDATE FUNCTION ----------------------
  // Sends updated user data to backend
  const update = async () => {
    const formData = {
      name,
      age,
      gender,
      foodGroup: foodGroups[food],
      email: mail,
      phone,
      state: data.states[state].state,
      district: data.states[state].districts[district],
      address,
    };

    try {
      await axios.put(`/user/`, formData);
      setEdit(true); // Disable edit mode again
      await getLoggedIn(); // Refresh context data
      alert("User updated successfully");
    } catch (error) {
      alert("User not updated");
    }
  };
  // ------------------------------------------------------------

  return (
    <div>
      <section className="flex justify-center items-center">
        {/* Form starts */}
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <table className="w-full" cellPadding={15}>
            {/* ----------- Row 1: Name, Age, Gender ----------- */}
            <tr>
              <td>
                <label className="font-semibold leading-8">
                  Name:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  disabled={edit}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>

              <td>
                <label className="font-semibold leading-8">
                  Age:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="number"
                  placeholder="Enter your age"
                  required
                  disabled={edit}
                  value={age}
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
                  disabled={edit}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </td>
            </tr>

            {/* ----------- Row 2: Food Group, Mobile, Buttons ----------- */}
            <tr>
              <td>
                <label htmlFor="food" className="font-semibold leading-8">
                  Food Group:<font color="red">*</font>
                </label>
                <select
                  name="food"
                  id="food"
                  disabled={edit}
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {foodGroups.map((e, i) => (
                    <option key={i} value={i}>
                      {e}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <label className="font-semibold leading-8">
                  Mobile:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="number"
                  placeholder="Enter your mobile"
                  required
                  disabled={edit}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </td>

              {/* Buttons section */}
              <td className="absolute">
                {/* Edit/Cancel toggle button */}
                <button
                  type="button"
                  onClick={() => setEdit(!edit)}
                  className="w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom"
                >
                  {edit ? "Edit" : "Cancel"}
                </button>

                <br />

                {/* Save button (only visible when editing) */}
                <button
                  type="submit"
                  className={`w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom ${
                    edit && "hidden"
                  }`}
                >
                  Save
                </button>
              </td>
            </tr>

            {/* ----------- Row 3: Password & Email ----------- */}
            <tr>
              <td>
                <label className="font-semibold leading-8">
                  Password:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="password"
                  placeholder="Enter your password"
                  required
                  disabled // password can't be edited
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>

              <td>
                <label className="font-semibold leading-8">Email:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="email"
                  placeholder="Enter your email"
                  disabled={edit}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </td>
            </tr>

            {/* ----------- Row 4: State & District ----------- */}
            <tr>
              <td>
                <label htmlFor="state" className="font-semibold leading-8">
                  State:<font color="red">*</font>
                </label>
                <select
                  name="state"
                  id="state"
                  disabled={edit}
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setDistrict(0); // Reset district when state changes
                  }}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {data.states.map((e, i) => (
                    <option key={i} value={i}>
                      {e.state}
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
                  disabled={edit}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {data.states[state].districts.map((e, i) => (
                    <option key={i} value={i}>
                      {e}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* ----------- Row 5: Address ----------- */}
            <tr>
              <td colSpan={2}>
                <label className="font-semibold leading-8">Address:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  placeholder="Enter your address"
                  disabled={edit}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
          </table>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
