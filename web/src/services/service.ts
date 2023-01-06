import axios from 'axios';

import ProductSave from '../models/ProductSave';
import ProductDelete from '../models/ProductDelete';

// const api = axios.create({
//   baseURL: 'http://localhost:80/Scandiweb/server/products'
// });

const api = axios.create({
  baseURL: 'https://juniortest-rafaelesouza.000webhostapp.com/products'
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


// const baseURL = 'https://juniortest-rafaelesouza.000webhostapp.com/products';

// export const deleteProducts = async (route: string, selectedProducts: ProductDelete[]) => {
//   const response = await fetch(`${baseURL}${route}`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(selectedProducts),
//   });

//   const data = await response.json();

//   console.log(data);
// }