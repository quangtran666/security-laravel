import axios, {csrfCookie } from '../plugins/axios.ts'
import type {LoginRequestType} from "../types/auth/loginRequest.ts";

export const login = async (loginRequest : LoginRequestType)=> {
    await csrfCookie();
    const response = await axios.post("auth/spa/login", loginRequest);
    return response.data;
}

export const logout = async () => {
    await axios.post("auth/spa/logout");
}