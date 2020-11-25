import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mangadex.org/api/v2/',
});

export default api
