import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
  let path: string = useLocation().pathname;
  let [currentPage, setCurrentPage] = useState('');

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

  return (
    <nav className='navbar'>
      <div className='navTitle'>
        Product {currentPage}
      </div>
      <div className='navLinks'>
        <ul>
          <li>
            {
              {
                'List': <Link to="/add">Add</Link>,
                'Add': <Link to="/">Save</Link>
              }[currentPage]
            }
          </li>
          <li>
            {
              {
                'List': <Link to="/">Mass delete</Link>,
                'Add': <Link to="/">Cancel</Link>
              }[currentPage]
            }
          </li>
        </ul>
      </div>
    </nav>
  )
}
