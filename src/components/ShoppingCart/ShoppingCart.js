// import React from 'react';
import React, { useState, useEffect } from 'react';
import styles from './ShoppingCart.module.css';

export default function ShoppingCart() {
  const [myGoods, setMyGoods] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const itemsInLocalStorage = JSON.parse(localStorage.getItem('items'));

    if (itemsInLocalStorage) {
      const result = itemsInLocalStorage.map(good => ({ ...good, count: 1 }));
      setMyGoods(result);
    }
  }, []);
  useEffect(() => {
    countTotalPrice();
  });

  const onIncrement = (count, amount, id) => {
    if (count < amount) {
      const updatedResult = myGoods.map(good => {
        if (good._id === id) {
          return { ...good, count: good.count + 1 };
        }
        return good;
      });

      setMyGoods(updatedResult);
    }
  };
  const onDecrement = (count, id) => {
    if (count > 1) {
      const updatedResult = myGoods.map(good => {
        if (good._id === id) {
          return { ...good, count: good.count - 1 };
        }
        return good;
      });
      setMyGoods(updatedResult);
    }
  };
  const onRemove = id => {
    const result = myGoods.filter(good => good._id !== id);
    setMyGoods(result);
    localStorage.setItem('items', JSON.stringify(result));
  };
  const countTotalPrice = () => {
    const totalResult = myGoods.reduce((result, { count, price }) => {
      result = result + count * price;
      return result;
    }, 0);
    setTotalPrice(totalResult);
  };
  const inputHandler = e => {
    if (e.target.name === 'Name') {
      setUserName(e.target.value);
    } else if (e.target.name === 'Email') {
      setUserEmail(e.target.value);
    } else if (e.target.name === 'Phone') {
      setUserPhone(e.target.value);
    } else if (e.target.name === 'Address') {
      setUserAddress(e.target.value);
    }

    return;
  };
  const onSubmit = () => {
    const order = myGoods.map(good => ({
      [good.name]: {
        count: good.count,
        price: good.price,
        totalPrice: good.count * good.price,
      },
    }));
    const myOrder = {
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userAddress: userAddress,
      TotalPriceForOrder: totalPrice,
      order: order,
    };

    console.log('myOrder: ', myOrder);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserAddress('');
    setMyGoods([]);
    localStorage.clear();
    return myOrder;
  };
  return (
    <div className={styles.cart__container}>
      <section className={styles.cart__section}>
        <form>
          <label className={styles.cart__label}>
            Name:
            <br />
            <input
              className={styles.cart__input}
              type="name"
              name="Name"
              value={userName}
              placeholder="enter your name"
              onChange={inputHandler}
            ></input>
          </label>
          <br />
          <label>
            E-mail:
            <br />
            <input
              className={styles.cart__input}
              type="email"
              name="Email"
              value={userEmail}
              onChange={inputHandler}
              placeholder="enter your e-mail"
            ></input>
          </label>
          <br />
          <label>
            Phone:
            <br />
            <input
              className={styles.cart__input}
              type="tel"
              name="Phone"
              value={userPhone}
              onChange={inputHandler}
              placeholder="enter your phone"
            ></input>
          </label>
          <br />
          <label>
            Address:
            <br />
            <input
              className={styles.cart__input}
              type="text"
              name="Address"
              value={userAddress}
              onChange={inputHandler}
              placeholder="enter your address"
            ></input>
          </label>
        </form>
      </section>
      <section className={styles.cart__section}>
        <ul className={styles.goods__list}>
          {myGoods &&
            myGoods.map(({ name, image, _id, amount, price, count }) => {
              return (
                <li key={_id} className={styles.goods__item}>
                  <img className={styles.goods__image} src={image} alt={name} />
                  <div>
                    <p className={styles.goods__name}>{name}</p>
                    <p>Price: {price * count}</p>
                    <div className={styles.select__wrap}>
                      <p className={styles.select__amount}>{count}</p>
                      <div className={styles.button__wrap}>
                        <button
                          className={styles.select__button}
                          type="button"
                          onClick={() => onIncrement(count, amount, _id)}
                        >
                          &#9650;
                        </button>
                        <button
                          className={styles.select__button}
                          type="button"
                          onClick={() => onDecrement(count, _id)}
                        >
                          &#9660;
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.remove__button}
                      onClick={() => onRemove(_id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
      <section className={styles.cart__total}>
        <p className={styles.total__price}>Total price: {totalPrice}</p>
        <button
          className={styles.total__submit}
          type="button"
          onClick={onSubmit}
        >
          Submit
        </button>
      </section>
    </div>
  );
}
