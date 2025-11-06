import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json";
import { useParams } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";
import mapboxgl from "mapbox-gl";

// --------------------------- COMPONENT PURPOSE ---------------------------
// This component allows a food bank user to edit their profile details.
// It fetches data from the user context, displays them in editable inputs,
// and allows updates including location (latitude, longitude) using Mapbox.
const EditProfile = () => {
  const { handle } = useParams();
  const { getLoggedIn, user } = useContext(AuthContext);

  // --------------------------- STATE VARIABLES ---------------------------
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(true); // Controls edit mode (true = read-only)
  const [hospital, setHospital] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("Private");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // --------------------------- FILL USER DATA ---------------------------
  useEffect(() => {
    // Load data from logged-in user
    setName(user.name);
    setHospital(user.hospital);
    setContactPerson(user.contactPerson);
    setCategory(user.category);
    setWebsite(user.website);
    setMail(user.email);
    setPhone(user.phone);

    // Match user's state and district from JSON file
    data.states.forEach((e, i) => {
      if (e.state === user.state) {
        setState(i);
        setDistrict(e.districts.indexOf(user.district));
      }
    });

    // Default password is hidden placeholder
    setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
    setAddress(user.address);
    setLatitude(user.latitude);
    setLongitude(user.longitude);
  }, []);

  // --------------------------- MAP DISPLAY ---------------------------
  // Re-renders the map whenever coordinates change
  useEffect(() => {
    if (longitude === 0) return; // skip if coords not loaded yet
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 10.7,
    });
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }, [latitude, longitude]);

  // --------------------------- UPDATE PROFILE ---------------------------
  const update = async () => {
    const formData = {
      name,
      email: mail,
      phone,
      state: data.states[state].state,
      district: data.states[state].districts[district],
      address,
      latitude,
      longitude,
      hospital,
      contactPerson,
      website,
      category,
    };

    await axios.put(`/bank`, formData).then(
      async (response) => {
        setEdit(true); // Switch back to view mode
        await getLoggedIn(); // Refresh user data from backend
        alert("Food Bank updated successfully");
      },
      (error) => {
        alert("Something went wrong while updating Food Bank profile");
      }
    );
  };

  // --------------------------- FETCH GEOLOCATION ---------------------------
  const fetchGeo = async () => {
    // If no change in lat/long, no need to fetch again
    if (latitude === user.latitude && longitude === user.longitude) return;

    await navigator.geolocation.getCurrentPosition(
      (p) => {
        setLatitude(p.coords.latitude);
        setLongitude(p.coords.longitude);
      },
      () => {
        alert("Please allow location access");
        setLatitude(user.latitude);
        setLongitude(user.longitude);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0, // prevent cached data
      }
    );
  };

  // --------------------------- UI PART ---------------------------
  return (
    <div>
      <section className="flex justify-center items-center">
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <table className="w-full" cellPadding={15}>
            {/* ---------- ROW 1 ---------- */}
            <tr>
              <td>
                <label className="font-semibold leading-8">
                  Food Bank Name:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  required
                  disabled={edit}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <label className="font-semibold leading-8">
                  Parent FoodBank Name:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  required
                  disabled={edit}
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
              </td>
              <td>
                <label className="font-semibold leading-8">
                  Contact Person:
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  disabled={edit}
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </td>
            </tr>

            {/* ---------- ROW 2 ---------- */}
            <tr>
              <td>
                <label htmlFor="category" className="font-semibold leading-8">
                  Category:<font color="red">*</font>
                </label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  disabled={edit}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  <option value="Private">Private</option>
                  <option value="Govt.">Govt.</option>
                  <option value="Red Cross">Red Cross</option>
                </select>
              </td>
              <td>
                <label className="font-semibold leading-8">
                  Mobile:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="number"
                  required
                  disabled={edit}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </td>
              <td>
                <label className="font-semibold leading-8">
                  Password:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="password"
                  disabled
                  value={password}
                />
              </td>
            </tr>

            {/* ---------- ROW 3 ---------- */}
            <tr>
              <td>
                <label className="font-semibold leading-8">Email:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="email"
                  disabled={edit}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </td>
              <td>
                <label className="font-semibold leading-8">Website:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  disabled={edit}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </td>
              {/* Buttons */}
              <td className="absolute">
                <button
                  type="button"
                  onClick={() => setEdit(!edit)}
                  className="w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold"
                >
                  {edit ? "Edit" : "Cancel"}
                </button>
                <br />
                <button
                  type="submit"
                  className={`w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold ${
                    edit && "hidden"
                  }`}
                >
                  Save
                </button>
              </td>
            </tr>

            {/* ---------- STATE & DISTRICT ---------- */}
            <tr>
              <td>
                <label htmlFor="state" className="font-semibold leading-8">
                  State:<font color="red">*</font>
                </label>
                <select
                  name="state"
                  id="state"
                  disabled={edit}
                  onChange={(e) => {
                    setState(e.target.value);
                    setDistrict(0);
                  }}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {data.states.map((e, i) => (
                    <option key={i} value={i} selected={state === i}>
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
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {data.states[state].districts.map((e, i) => (
                    <option key={i} value={i} selected={district === i}>
                      {e}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* ---------- ADDRESS & MAP ---------- */}
            <tr>
              <td colSpan={3}>
                <label className="font-semibold leading-8">Address:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  disabled={edit}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={3}>
                <label className="font-semibold leading-7">
                  Location:<font color="red">*</font>
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {/* Map Section */}
                  <div
                    className="w-full"
                    style={{ gridColumn: "2/4", gridRow: "1/3" }}
                  >
                    <div id="map" className="w-full h-[200px]"></div>
                  </div>

                  {/* Latitude/Longitude Section */}
                  <div style={{ gridColumn: "1", gridRow: "1/2" }}>
                    <input
                      className="w-full p-3 text-md border border-silver rounded"
                      type="number"
                      step="0.01"
                      placeholder="Latitude"
                      disabled
                      value={latitude}
                      required
                    />
                    <br />
                    <br />
                    <input
                      className="w-full p-3 text-md border border-silver rounded"
                      type="number"
                      step="0.01"
                      placeholder="Longitude"
                      disabled
                      value={longitude}
                      required
                    />
                    <button
                      type="button"
                      disabled={edit}
                      className="bg-purple text-center text-white-900 rounded-lg mt-4 px-4 py-2"
                      onClick={fetchGeo}
                    >
                      Update Geocode
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
