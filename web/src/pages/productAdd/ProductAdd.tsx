import React, { ChangeEvent, useEffect, useState } from 'react';
import './ProductAdd.scss';
import Product from '../../models/Product';
import { getByKey } from '../../services/service';
import { toast } from 'react-toastify';

function ProductAdd() {
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
    attribute: ''
  });

  async function validateSku(sku: string) {
    if(await getByKey("/get", sku)){
      toast.error('SKU must be unique.');
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log(product);
  }, [product])
  

  return (
    <div className='product-add'>
      <form id='product_form'>
        <label>
          <span className='input-label'>SKU</span>
          <input
            type="text" name="sku" id="sku" placeholder="SKU001"
            value={product.sku}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onBlur={(e: ChangeEvent<HTMLInputElement>) => validateSku(e.target.value)}
            required
          />
          <span id="helper-text">SKU must be unique.</span>
        </label>

        <label>
          <span className='input-label'>Name</span>
          <input
            type="text" name="name" id="name"
            placeholder="How to Catch an Elf" 
            value={product.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
          />
        </label>

        <label>
          <span className='input-label'>Price ($)</span>
          <input
          type="number" step=".01" name="price" id="price"
          value={product.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          required
          />
          <span id="helper-text">Price must be a value {`>`} 0.</span>
        </label>

        <label>
          <span className='input-label'>Type switcher</span>
          <select
          name="type" id="productType" 
          value={product.type} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
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
                  <span className='input-label'>Weight (kg)</span>
                  <input
                    type="number" name="weight" id="weight"
                    placeholder="1"
                    value={product.weight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    required
                  />
                  <span id="helper-text">The weight must be a value {`>`} 0.</span>
                </label>
              </>
            ),

            'DC': (
              <>
                <label>
                  <span className='input-label'>Size (MB)</span>
                  <input
                    type="number" name="size" id="size"
                    placeholder="1024"
                    value={product.size}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    required
                  />
                  <span id="helper-text">The size must be a value {`>`} 0.</span>
                </label>
              </>
            ),

            'FN': (
              <>
                <label>
                  <span className='input-label'>Height (cm)</span>
                  <input
                    type="number" name="height" id="height"
                    placeholder="100"
                    value={product.height}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    required
                  />
                  <span id="helper-text">The height must be a value {`>`} 0.</span>
                </label>
                
                <label>
                  <span className='input-label'>Width (cm)</span>
                  <input
                    type="number" name="width" id="width"
                    placeholder="100"
                    value={product.width}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    required
                  />
                  <span id="helper-text">The width must be a value {`>`} 0.</span>
                </label>
                
                <label>
                  <span className='input-label'>Length (cm)</span>
                  <input
                    type="number" name="length" id="length"
                    placeholder="100"
                    value={product.length}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    required
                  />
                  <span id="helper-text">The length must be a value {`>`} 0.</span>
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