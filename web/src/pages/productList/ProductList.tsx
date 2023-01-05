import './ProductList.scss';

import React, { ChangeEvent, useEffect, useState } from 'react';

import ProductSave from '../../models/ProductSave';
import { deleteProducts, getAll } from '../../services/service';
import ProductDelete from '../../models/ProductDelete';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductSave[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductDelete[]>([]);

  async function getProduct() {
    await getAll("/get", setProducts);
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

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pd = { "sku": e.target.value }
    if(e.target.checked){
      if(!selectedProducts.includes(pd)){
        setSelectedProducts([...selectedProducts, pd]);
      }
    }else{
      let newSelectedProducts = selectedProducts.filter((product) => product !== pd);
      setSelectedProducts(newSelectedProducts);
    }
  }

  async function handleDelete(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    await deleteProducts("/delete", selectedProducts);

    setSelectedProducts([]);
    navigate(0);
  }

  

  return (
    <div className='product-list'>
      {
          products.map((product) => (
              <div className='product' key={product.sku}>
                <div>
                  <input type="checkbox" name="delete-checkbox" value={product.sku} id="delete-checkbox" onChange={(e) => handleCheck(e)}/>
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
          ))
      }
      
      <form onSubmit={handleDelete} id="delete_form" className="delete_form" />
    </div>
  )
}