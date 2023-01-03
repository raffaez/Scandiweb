import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  let path = useLocation().pathname;
  let [currentPage, setCurrentPage] = React.useState('');

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
    <nav>
      <div>
        Product {currentPage}
      </div>
      <div>
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
