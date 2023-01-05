import axios from 'axios';

import ProductSave from '../models/ProductSave';
import ProductDelete from '../models/ProductDelete';

// const api = axios.create({
//   baseURL: 'http://localhost:80/ecommerce/server/products'
// });

const api = axios.create({
  baseURL: 'http://juniortest-rafaelesouza.unaux.com/products'
})

export const getAll = async (route: string, setData: React.Dispatch<React.SetStateAction<ProductSave[]>>) => {
  const response = await api.get(route);
  setData(response.data.response);
}

export const getByKey = async (route: string, key: string) => {
  const response = await api.get(`${route}/${key}`);
  return response.data.response === 'No record found!' ? false : true;
}

export const saveProduct = async (route: string, data: ProductSave) => {
  await api.post(route, data);
}

export const deleteProducts = async (route: string, selectedProducts: ProductDelete[]) => {
  const response = await api.post(route, selectedProducts);
  return response.data.response;
}