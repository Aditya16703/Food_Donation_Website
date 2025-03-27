import axios from "axios";

const baseURL = "https://food-donation-website-fv3s.onrender.com/";

export default axios.create({ baseURL: baseURL });
