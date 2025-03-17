import axios from "../plugins/axios.ts";

export const getMe = async () => {
    return await axios.get("user");
}