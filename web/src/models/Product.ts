export default interface Product {
  sku: string;
  name: string;
  price: number;
  type: string;
  attribute?: string;
  weight?: number;
  size?: number;
  width?: number;
  height?: number;
  length?: number;
}