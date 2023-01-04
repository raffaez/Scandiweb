import './ProductAdd.scss';

import React, { ChangeEvent, useEffect, useState } from 'react';

import Product from '../../models/Product';
import ProductSave from '../../models/ProductSave';
import { getByKey, saveProduct } from '../../services/service';
import { toast } from 'react-toastify';

function ProductAdd() {
  const [createdId, setCreatedId] = useState<string>('');
  const [product, setProduct] = useState<Product>({
    sku: '',
    name: '',
    price: 0,
    type: '',
    weight: 0,
    size: 0,
    height: 0,
    width: 0,
    length: 0,
  });
  const [productSave, setProductSave] = useState<ProductSave>({
    sku: '',
    name: '',
    price: 0,
    type: '',
    attribute: '',
  });

  const [invalidSku, setInvalidSku] = useState<boolean>(false);

  async function validateSku() {
    if(product.sku === "") return;
    if(await getByKey("/get", product.sku)){
      setInvalidSku(true);
    }else{
      setInvalidSku(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    validateSku();
  }, [product]);

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    switch (product.type) {
      case 'BK':
        setProductSave({
          ...product,
          attribute: `${product.weight}KG`
        });
        
        await saveProduct("/post", productSave, setCreatedId);

        toast.success(`${productSave.name} added successfully! ID: ${createdId}`);
    }
  }
  

  return (
    <div className='product-add'>
      <form id='product_form' onSubmit={handleSubmit}>
        <label>
          <span className='input-label'>SKU*</span>
          <input
            type="text" name="sku" id="sku" placeholder="SKU001"
            value={product.sku}
            onInput={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            className={invalidSku?"input-field--error":"input-field"}
            required
          />
          <span className={invalidSku?"helper-text--error":"helper-text"}>This SKU is already taken.</span>
        </label>

        <label>
          <span className='input-label'>Name*</span>
          <input
            type="text" name="name" id="name"
            placeholder="How to Catch an Elf" 
            value={product.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            className="input-field"
            required
          />
        </label>

        <label>
          <span className='input-label'>Price ($)*</span>
          <input
          type="number" name="price" id="price"
          value={product.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          step=".01" min="0.01"
          className="input-field"
          required
          />
          <span className="helper-text--attributes">Price must be a value {`>`} 0.</span>
        </label>

        <label>
          <span className='input-label'>Type switcher*</span>
          <select
          name="type" id="productType" 
          value={product.type} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
          className="input-field"
          required
          >
            <option value="" disabled>Select a type</option>
            <option value="BK">Book</option>
            <option value="DC">Disc</option>
            <option value="FN">Furniture</option>
          </select>
        </label>

        {
          {
            'BK': (
              <>
                <label>
                  <span className='input-label'>Weight (kg)*</span>
                  <input
                    type="number" name="weight" id="weight"
                    placeholder="1"
                    value={product.weight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    step=".01" min="0.01"
                    className="input-field"
                    required
                  />
                  <span className="helper-text--attributes">The weight must be a value {`>`} 0.</span>
                </label>
              </>
            ),

            'DC': (
              <>
                <label>
                  <span className='input-label'>Size (MB)*</span>
                  <input
                    type="number" name="size" id="size"
                    placeholder="1024"
                    value={product.size}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    min="1"
                    className="input-field"
                    required
                  />
                  <span className="helper-text--attributes">The size must be a value {`>`} 0.</span>
                </label>
              </>
            ),

            'FN': (
              <>
                <label>
                  <span className='input-label'>Height (cm)*</span>
                  <input
                    type="number" name="height" id="height"
                    placeholder="100"
                    value={product.height}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    min="1"
                    className="input-field"
                    required
                  />
                  <span className="helper-text--attributes">The height must be a value {`>`} 0.</span>
                </label>
                
                <label>
                  <span className='input-label'>Width (cm)*</span>
                  <input
                    type="number" name="width" id="width"
                    placeholder="100"
                    value={product.width}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    min="1"
                    className="input-field"
                    required
                  />
                  <span className="helper-text--attributes">The width must be a value {`>`} 0.</span>
                </label>
                
                <label>
                  <span className='input-label'>Length (cm)*</span>
                  <input
                    type="number" name="length" id="length"
                    placeholder="100"
                    value={product.length}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    min="1"
                    className="input-field"
                    required
                  />
                  <span className="helper-text--attributes">The length must be a value {`>`} 0.</span>
                </label>
              </>
            )

          }[product.type]
        }
      </form>
    </div>
  )
}

export default ProductAdd