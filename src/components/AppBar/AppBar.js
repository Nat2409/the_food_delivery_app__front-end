import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './AppBar.module.css';

export default function AppBar() {
  return (
    <ul className={styles.navList}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'pending')}
          to={routes.home}
        >
          Shop
        </NavLink>
      </li>
      <li className={styles.navList__item_border}>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'pending')}
          to={routes.shoppingCart}
        >
          Shoping Cart
        </NavLink>
      </li>
    </ul>
  );
}
