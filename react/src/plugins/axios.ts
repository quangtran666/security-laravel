import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const csrfCookie = async () => {
    return await axios.get("csrf-cookie");
}

export default axios;