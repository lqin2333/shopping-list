import axios from 'axios';

const api = "http://5b07df1f92b3b4001425a0ec.mockapi.io/api/v1/";

export const getAllItems = () => axios.get(`${api}/shopping-item`);

export const getItem = (id) => axios.get(`${api}/shopping-item/${id}`);

export const createItem = (body) => axios.post(`${api}/shopping-item`, body);

export const updateItem = (id, body) => axios.put(`${api}/shopping-item/${id}`, body);

export const deleteItem = (id) => axios.delete(`${api}/shopping-item/${id}`);