import React, { useEffect, useState } from 'react';
import './ProductList.scss';
import Product from '../../models/Product';
import { getAll } from '../../services/service';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProduct() {
    await getAll("/get", setProducts);
    console.log(products);
  }

  useEffect(() => {
    getProduct();
  }, [products.length]);
  
  const attribute = (type: string) => {
    return {
      'BK': 'Weight',
      'DC': 'Size',
      'FN': 'Dimensions'
    }[type];
  }

  return (
    <div className='product-list'>
      {
        React.Children.toArray(
          products.map((product: any) => {

            return (
              <div className='product'>
                <div>
                  <input type="checkbox" name="delete-checkbox" id="delete-checkbox" />
                </div>
                <div className='product-sku'>
                  {product.sku}
                </div>
                <div className='product-name'>
                  {product.name}
                </div>
                <div className='product-price'>
                  {product.price} $
                </div>
                <div className='product-attribute'>
                {attribute(product.type)}: {product.attribute}
                </div>
              </div>
            )
          })
        )
      }
    </div>
  )
}