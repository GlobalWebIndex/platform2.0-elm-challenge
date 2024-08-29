import React from 'react';
import {Outlet} from 'react-router';
import {Link} from 'react-router-dom';
import styles from './styles.scss';

export const Layout = (): JSX.Element => (
  <>
    <div className={styles.navigation}>
      <h1>Cat lover</h1>
      <nav>
        <ul>
          <li>
            <Link to="cats">Cats</Link>
          </li>
          <li>
            <Link to="breeds">Breeds</Link>
          </li>
        </ul>
      </nav>
    </div>
    <Outlet />
  </>
);
