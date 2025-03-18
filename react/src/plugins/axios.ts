import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['XDEBUG_SESSION'] = "PHPSTORM";

export const csrfCookie = async () => {
    return await axios.get("csrf-cookie");
}

export default axios;