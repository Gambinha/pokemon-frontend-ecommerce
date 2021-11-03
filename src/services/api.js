import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokestock-ifrs.herokuapp.com/pokestock',
});

export default api;