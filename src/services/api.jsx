import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: { Authorization: `Bearer ${sessionStorage.getItem("@App:token")}` },
})

export default Api;