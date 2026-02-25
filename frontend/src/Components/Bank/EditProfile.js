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
    if (user) {
      // Load data from logged-in user
      setName(user.name || "");
      setHospital(user.hospital || "");
      setContactPerson(user.contactPerson || "");
      setCategory(user.category || "Private");
      setWebsite(user.website || "");
      setMail(user.email || "");
      setPhone(user.phone || "");

      let stateIdx = 0;
      let districtIdx = 0;
      // Match user's state and district from JSON file
      data.states.forEach((e, i) => {
        if (e.state === user.state) {
          stateIdx = i;
          const dIdx = e.districts.indexOf(user.district);
          districtIdx = dIdx !== -1 ? dIdx : 0;
        }
      });
      setState(stateIdx);
      setDistrict(districtIdx);

      // Default password is hidden placeholder
      setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
      setAddress(user.address || "");
      setLatitude(user.latitude || 0);
      setLongitude(user.longitude || 0);
    }
  }, [user]);

  // --------------------------- MAP DISPLAY ---------------------------
  // Re-renders the map whenever coordinates change
  useEffect(() => {
    if (longitude === 0) return; // skip if coords not loaded yet
    // Token assignment removed for push
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2R1bW15In0.dummy";
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
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div className="flex items-center space-x-5">
            <div className="h-16 w-16 rounded-[2rem] bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white-900 text-3xl shadow-xl">
                 <i className="fa-solid fa-building-columns"></i>
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-2">{name || "Food Bank"}</h1>
              <p className="text-secondary-500 font-medium">Official Food Bank Registry & Profile Management</p>
            </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg flex items-center space-x-2 ${
              edit 
                ? "bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-white-900" 
                : "bg-error text-white-900 shadow-error/20"
            }`}
          >
            <i className={`fa-solid ${edit ? "fa-pen-to-square" : "fa-xmark"}`}></i>
            <span>{edit ? "Edit Profile" : "Cancel"}</span>
          </button>

          {!edit && (
            <button
              onClick={update}
              className="px-8 py-3 rounded-2xl font-bold bg-primary-600 text-white-900 shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center space-x-2"
            >
              <i className="fa-solid fa-check"></i>
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stats & Meta */}
        <div className="lg:col-span-4 space-y-8 animate-fade-in-up">
            <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-white-900/20 shadow-premium">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="h-10 w-1 bg-primary-600 rounded-full"></div>
                    <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">Facility Metadata</h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Parent Organization</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="text"
                            required
                            disabled={edit}
                            value={hospital}
                            onChange={(e) => setHospital(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Bank Category</label>
                        <div className="relative">
                            <select
                                value={category}
                                disabled={edit}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                            >
                                <option value="Private">Private</option>
                                <option value="Govt.">Govt.</option>
                                <option value="Red Cross">Red Cross</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Official Website</label>
                        <div className="relative group">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                                <i className="fa-solid fa-globe"></i>
                            </div>
                            <input
                                className="input-field dark:bg-secondary-900/50 pl-11"
                                type="url"
                                disabled={edit}
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Presence Stats */}
             <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-white-900/20 shadow-premium">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-3xl bg-success/5 border border-success/10 text-center">
                        <div className="text-2xl font-black text-success">Active</div>
                        <div className="text-[10px] font-bold text-secondary-500 uppercase tracking-widest mt-1">Status</div>
                    </div>
                    <div className="p-4 rounded-3xl bg-primary-50 border border-primary-100 text-center">
                        <div className="text-2xl font-black text-primary-600">85%</div>
                        <div className="text-[10px] font-bold text-secondary-500 uppercase tracking-widest mt-1">Trust Score</div>
                    </div>
                </div>
             </div>
        </div>

        {/* Right Column: Contact & Location */}
        <div className="lg:col-span-8 space-y-8 animate-fade-in-up delay-100">
             <div className="glass dark:glass-dark rounded-[3rem] p-10 border border-white-900/20 shadow-premium">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="h-10 w-1 bg-success rounded-full"></div>
                    <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">Contact & Registration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">Official Name</label>
                        <input
                            className="input-field dark:bg-secondary-900/50 font-bold"
                            type="text"
                            required
                            disabled={edit}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">Contact Person</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="text"
                            disabled={edit}
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">Official Email</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="email"
                            disabled={edit}
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">Hotline Number</label>
                        <input
                            className="input-field dark:bg-secondary-900/50"
                            type="tel"
                            required
                            disabled={edit}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-secondary-100 dark:border-secondary-800 pt-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">State</label>
                         <div className="relative">
                            <select
                                disabled={edit}
                                value={state}
                                onChange={(e) => {
                                    setState(Number(e.target.value));
                                    setDistrict(0);
                                }}
                                className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                            >
                                {data.states.map((e, i) => (
                                    <option key={i} value={i}>{e.state}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">District</label>
                        <div className="relative">
                            <select
                                disabled={edit}
                                value={district}
                                onChange={(e) => setDistrict(Number(e.target.value))}
                                className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                            >
                                {data.states[state].districts.map((e, i) => (
                                    <option key={i} value={i}>{e}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-secondary-500 ml-1">Detailed Address</label>
                        <textarea
                            className="input-field dark:bg-secondary-900/50 min-h-[100px] pt-3"
                            disabled={edit}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                    </div>
                </div>
             </div>

             {/* Map Card */}
             <div className="glass dark:glass-dark rounded-[3rem] p-10 border border-white-900/20 shadow-premium overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-1 bg-primary-600 rounded-full"></div>
                        <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">Geospatial Presence</h3>
                    </div>
                    <button
                        type="button"
                        disabled={edit}
                        onClick={fetchGeo}
                        className="px-6 py-2.5 rounded-xl bg-primary-500 text-white-900 font-bold text-sm shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <i className="fa-solid fa-location-crosshairs"></i>
                        <span>Sync with My Location</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 relative group">
                        <div id="map" className="w-full h-[300px] rounded-[2rem] border-4 border-white-900 dark:border-secondary-800 shadow-xl overflow-hidden"></div>
                        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Latitude</label>
                            <div className="p-4 rounded-2xl bg-secondary-50 dark:bg-white-100/5 border border-secondary-100 dark:border-secondary-800 font-mono font-bold text-secondary-900 dark:text-white-900">
                                {latitude.toFixed(6)}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-400 uppercase tracking-widest ml-1">Longitude</label>
                            <div className="p-4 rounded-2xl bg-secondary-50 dark:bg-white-100/5 border border-secondary-100 dark:border-secondary-800 font-mono font-bold text-secondary-900 dark:text-white-900">
                                {longitude.toFixed(6)}
                            </div>
                        </div>
                        <div className="p-5 bg-warning/5 border border-warning/10 rounded-2xl">
                             <div className="flex items-start space-x-3">
                                <i className="fa-solid fa-triangle-exclamation text-warning mt-1 text-sm"></i>
                                <p className="text-[10px] text-warning font-bold leading-relaxed uppercase tracking-wider">
                                    Coordinates are used for the real-time locator system. Ensure accuracy for logistics support.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
