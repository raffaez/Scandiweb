import './ProductAdd.scss';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Product from '../../models/Product';
import ProductSave from '../../models/ProductSave';
import { getByKey, saveProduct } from '../../services/service';

function ProductAdd() {
  const navigate = useNavigate();
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
  const [invalidFields, setInvalidField] = useState<string[]>([]);

  async function validateSku() {
    if(product.sku === ""){
      setInvalidSku(false);
      return;
    }
    
    if(await getByKey("/get", product.sku)){
      setInvalidSku(true);
    }else{
      setInvalidSku(false);
    }
  }

  function validate(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    if(e.target.value === "" || parseFloat(e.target.value) <= 0){
      if(!invalidFields.includes(e.target.name)){
        setInvalidField([...invalidFields, e.target.name]);
      }
    }else{
      let newInvalidFields = invalidFields.filter((field) => field !== e.target.name);
      setInvalidField(newInvalidFields);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    setProduct({ ...product, [e.target.name]: e.target.value });

    validate(e);
  }

  useEffect(() => {
    validateSku();
  }, [product.sku]);

  useEffect(() => {
    switch (product.type) {
      case 'BK':
        setProductSave({
          ...product,
          attribute: `${product.weight}KG`
        });
        break;
      case 'DC':
        setProductSave({
          ...product,
          attribute: `${product.size}MB`
        });
        break;
      case 'FN':
        setProductSave({
          ...product,
          attribute: `${product.height}x${product.width}x${product.length}`
        });
        break;
    }
  }, [product]);

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    await saveProduct("/post", productSave);

    navigate(0);
  }

  const FORM_FIELDS = [
    {
      title: "SKU",
      name: "sku",
      type: "text",
      placeholder: "SKU001",
      value: product.sku,
      helperText: "Please enter an SKU.",
      helperText2: "This SKU is already taken.",
    },
    {
      title: "Name",
      name: "name",
      type: "text",
      placeholder: "How to Catch an Elf",
      value: product.name,
      helperText: "Please enter a name.",
    },
    {
      title: "Price ($)",
      name: "price",
      type: "number",
      placeholder: "19.99",
      value: product.price,
      helperText: "Please enter a valid price.",
    },
  ];

  return (
    <div className='product-add'>
        <form id='product_form' onSubmit={handleSubmit}>
          {
            FORM_FIELDS.map((field) => (
              <label key={field.name}>
                <span className='input-label'>{field.title}*</span>
                <input
                  type={field.type} name={field.name} id={field.name} placeholder={field.placeholder}
                  value={field.value===0 || field.value === '' ?'':field.value}
                  {...field.name === 'price' ? {step:".01", min:"0.01"} :''}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  onBlur={(e: ChangeEvent<HTMLInputElement>) => validate(e)}
                  className={invalidFields.includes(field.name)||(field.name==='sku'&&invalidSku)?"input-field--error":"input-field"}
                  required
                />
                <span
                className={invalidFields.includes(field.name)||(field.name==='sku'&&invalidSku)?"helper-text--error":"helper-text"}
                >
                  {field.name==='sku'&&invalidSku?field.helperText2:field.helperText}
                </span>
              </label>
            ))
          }

          <label>
            <span className='input-label'>Type switcher*</span>
            <select
            name="type" id="productType" 
            value={product.type} 
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
            onBlur={(e: ChangeEvent<HTMLSelectElement>) => validate(e)}
            className={invalidFields.includes('type')?"input-field--error":"input-field"}
            required
            >
              <option value="" disabled>Select a type</option>
              <option id="Book" value="BK">Book</option>
              <option id="DVD" value="DC">DVD</option>
              <option id="Furniture" value="FN">Furniture</option>
            </select>
            <span className={invalidFields.includes('type')?"helper-text--error":"helper-text"}>Please select a type.</span>
          </label>

          {
            {
              'BK': (
                <>
                  <label>
                    <span className='input-label'>Weight (kg)*</span>
                    <input
                      type="number" name="weight" id="weight"
                      placeholder="1.5"
                      step=".01" min="0.01"
                      value={product.weight===0?'':product.weight}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      onBlur={(e: ChangeEvent<HTMLInputElement>) => validate(e)}
                      className={invalidFields.includes('weight')?"input-field--error":"input-field"}
                      required
                    />
                    <span className={invalidFields.includes('weight')?"helper-text--error":"helper-text"}>Please enter a valid weight in KG.</span>
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
                      step="1" min="1"
                      value={product.size===0?'':product.size}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      onBlur={(e: ChangeEvent<HTMLInputElement>) => validate(e)}
                      className={invalidFields.includes('size')?"input-field--error":"input-field"}
                      required
                    /><span className={invalidFields.includes('size')?"helper-text--error":"helper-text"}>Please enter a valid size in MB.</span>
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
                      step="0.01" min="0.01"
                      value={product.height===0?'':product.height}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      onBlur={(e: ChangeEvent<HTMLInputElement>) => validate(e)}
                      className={invalidFields.includes('height')?"input-field--error":"input-field"}
                      required
                    />
                    <span className={invalidFields.includes('height')?"helper-text--error":"helper-text"}>Please enter a valid height in CM.</span>
                  </label>
                  
                  <label>
                    <span className='input-label'>Width (cm)*</span>
                    <input
                      type="number" name="width" id="width"
                      placeholder="100"
                      step="0.01" min="0.01"
                      value={product.width===0?'':product.width}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      onBlur={(e: ChangeEvent<HTMLInputElement>) => validate(e)}
                      className={invalidFields.includes('width')?"input-field--error":"input-field"}
                      required
                    />
                    <span className={invalidFields.includes('width')?"helper-text--error":"helper-text"}>Please enter a valid width in CM.</span>
                  </label>
                  
                  <label>
                    <span className='input-label'>Length (cm)*</span>
                    <input
                      type="number" name="length" id="length"
                      placeholder="100"
                      step="0.01" min="0.01"
                      value={product.length===0?'':product.length}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      onBlur={(e: ChangeEvent<HTMLInputElement>) => validate(e)}
                      className={invalidFields.includes('length')?"input-field--error":"input-field"}
                      required
                    />
                    <span className={invalidFields.includes('length')?"helper-text--error":"helper-text"}>Please enter a valid length in CM.</span>
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

