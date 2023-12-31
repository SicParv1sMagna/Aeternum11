import axios from 'axios';
import { URI } from './config';

const api = axios.create();

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            window.localStorage.removeItem("jwtToken");
            window.location.href = "/"
        } else if (response && response.status === 403) {
            window.location.href = "/"
        }
    }
);

setInterval(() => {
    const token = window.localStorage.getItem("jwtToken");
    if (token) {
        api.get(`${URI}/reset-token`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                window.localStorage.setItem("jwtToken", response.data.token);
            })
            .catch((error) => {
                console.error("Error resetting token:", error);
            });
    }
}, 5 * 60 * 1000); // 5 minutes in milliseconds

export default api;