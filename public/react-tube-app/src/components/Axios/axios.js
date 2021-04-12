import axios from "axios";

const instance = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {
        "Accept-Version": 1,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        "Requested-With": "Celestia's Royal Cake, Plot and Luna's Mooncheeks"
    },
    withCredentials: false
});

export default instance;