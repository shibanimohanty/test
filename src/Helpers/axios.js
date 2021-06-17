import axios from 'axios';

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer SeZL3gJ4PS4cBmHA3dLrm8ZDn6smzgvU1cjAe2vp"
}


const getAxiosInstance = () => {
    // const token = localStorage.getItem('access_token');
    const instance = axios.create({
        headers
    });
    // Loader Before data fetches 
    instance.interceptors.request.use(reqConfig => {
        document.getElementsByClassName("loader")[0].style.display = "block";
        return reqConfig;
    },
        err => {
            return Promise.reject(err);
        },
    );

    instance.interceptors.response.use(response => {
        document.getElementsByClassName("loader")[0].style.display = "none";
        return response;
    },
        (err) => {
            document.getElementsByClassName("loader")[0].style.display = "none";
            return Promise.reject({ ...err }.response);
        },
    );

    return instance;
}

export default getAxiosInstance();