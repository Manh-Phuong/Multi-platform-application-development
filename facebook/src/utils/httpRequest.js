import axios from 'axios';

const request = axios.create({
    baseURL: 'https://it4788.catan.io.vn',
});

export default request;