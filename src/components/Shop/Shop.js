import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Shop.module.css';
import apiUrl from '../../apiUrl';
import Spinner from '../Spinner';

export default function Shop() {
  const [shops, setShops] = useState([]);
  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios(`${apiUrl}/api/shops`)
      .then(res => {
        setShops([...res.data]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err: ', err);
        setIsLoading(false);
      });
  }, []);

  const shopHandler = id => {
    id &&
      axios(`${apiUrl}/api/goods/${id}`)
        .then(res => setGoods(res.data))
        .catch(err => console.log('err: ', err));
    return;
  };

  const onAddToCart = e => {
    const itemsInLocalStorage = JSON.parse(localStorage.getItem('items'));
    const myChoise = goods.find(good => good._id === e);

    if (itemsInLocalStorage) {
      const goodInCart = itemsInLocalStorage.find(
        item => item._id === myChoise._id
      );
      if (!goodInCart) {
        itemsInLocalStorage.push(myChoise);
      }
      localStorage.setItem('items', JSON.stringify(itemsInLocalStorage));
    } else {
      localStorage.setItem('items', JSON.stringify([myChoise]));
    }
  };
  return (
    <div className={styles.shops__container}>
      <section className={styles.shops__section}>
        <h2 className={styles.shops__title}>Shops:</h2>
        {isLoading && <Spinner />}
        <ul className={styles.shops__list}>
          {shops &&
            shops.map(({ _id, name }) => {
              return (
                <li key={_id} className={styles.shops__item}>
                  <button
                    className={styles.shops__button}
                    onClick={() => shopHandler(_id)}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
        </ul>
      </section>
      <section className={styles.shops__section}>
        <ul className={styles.goods__list}>
          {goods &&
            goods.map(good => {
              return (
                <li key={good._id} className={styles.goods__item}>
                  <img
                    className={styles.goods__image}
                    src={good.image}
                    alt={good.name}
                  />
                  <p className={styles.goods__name}>{good.name}</p>
                  <p className={styles.goods__button_position}>
                    <button
                      className={styles.goods__button}
                      type="button"
                      onClick={() => onAddToCart(good._id)}
                    >
                      add to Cart
                    </button>
                  </p>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
}
