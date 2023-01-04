import axios from 'axios';
import Product from '../models/Product';
import ProductSave from '../models/ProductSave';

const api = axios.create({
  baseURL: 'http://localhost:80/ecommerce/server/products'
});

export const getAll = async (route: string, setData: React.Dispatch<React.SetStateAction<Product[]>>) => {
  const response = await api.get(route);
  setData(response.data.response);
}

export const getByKey = async (route: string, key: string) => {
  const response = await api.get(`${route}/${key}`);
  return response.data.response === 'No record found!' ? false : true;
}

export const saveProduct = async (route: string, data: ProductSave, setData: React.Dispatch<React.SetStateAction<string>>) => {
  const response = await api.post(route, data);
  setData(response.data.response.insertedId);
}