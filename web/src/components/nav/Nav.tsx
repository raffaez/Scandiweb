import './Nav.scss';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  let path: string = useLocation().pathname;
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const title = () => {
      switch (path) {
        case '/':
          return 'List';
        case '/add':
          return 'Add';
        default:
          return '';
      }
    }
    setCurrentPage(title);
  }, [path]);

  function goTo(page: string) {
    return () => {
      navigate(`/${page}`);
    }
  }

  return (
    <nav className='navbar'>
      <div className='nav-title'>
        Product {currentPage}
      </div>
      <div className='nav-links'>
        <ul>
          <li>
            {
              {
                'List': <button onClick={goTo('add')}>Add</button>,
                'Add': <button type="submit" form="product_form">Save</button>
              }[currentPage]
            }
          </li>
          <li>
            {
              {
                'List': <button type="submit" form="delete_form" id="delete-product-btn">Mass delete</button>,
                'Add': <button onClick={goTo('')}>Cancel</button>
              }[currentPage]
            }
          </li>
        </ul>
      </div>
    </nav>
  )
}
