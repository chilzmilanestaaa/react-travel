//import axios
import axios from 'axios'

//import js cookie
import Cookies from 'js-cookie';

const Api = axios.create({
    
    //set endpoint API
    baseURL: import.meta.env.VITE_APP_BASEURL,

    //set header axios
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

//handle unathenticated

Api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            // Cek apakah user sudah punya token (berarti dia memang login)
            if (Cookies.get('token')) {
                Cookies.remove('token');
                window.location = '/admin/login';
            }
            // kalau belum login, jangan reload halaman!
        }

        return Promise.reject(error);
    }
)
;


export default Api