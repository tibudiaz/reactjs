import React, { useEffect, useState } from 'react';
import firebase from '../../firebaseConfig';
import './catalogo.css';

// importacion de imagenes para productos:
import iphone8Img from './img/8.jpg'
import iphone8PlusImg from './img/8p.jpg'
import iphoneXImg from './img/x.jpg'
import iphoneXrImg from './img/xr.jpg'
import iphoneXsImg from './img/xs.jpg'
import iphoneXsmImg from './img/xsm.jpg'
import iphone11Img from './img/11.jpg'
import iphone11pImg from './img/11p.jpg'
import iphone11pmImg from './img/11pm.jpg'
import iphone12Img from './img/12.png'
import iphone12pImg from './img/12p.png'
import iphone12pmImg from './img/12pm.png'
import iphone13Img from './img/13.jpg'
import iphone13pImg from './img/13p.jpg'
import iphone13pmImg from './img/13pm.jpg'
import iphone14Img from './img/14.jpg'
import iphone14pImg from './img/14p.jpg'
import iphone14pmImg from './img/14pm.jpg'


// objeto con la ruta de las imágenes correspondientes a cada nombre de producto
const images = {
  'iphone 8': iphone8Img,
  'iphone 8 plus': iphone8PlusImg,
  'iphone x': iphoneXImg,
  'iphone xr': iphoneXrImg,
  'iphone xs': iphoneXsImg,
  'iphone xs max': iphoneXsmImg,
  'iphone 11': iphone11Img,
  'iphone 11 pro': iphone11pImg,
  'iphone 11 pro max': iphone11pmImg,
  'iphone 12': iphone12Img,
  'iphone 12 pro': iphone12pImg,
  'iphone 12 pro max': iphone12pmImg,
  'iphone 13': iphone13Img,
  'iphone 13 pro': iphone13pImg,
  'iphone 13 pro max': iphone13pmImg,
  'iphone 14': iphone14Img,
  'iphone 14 pro': iphone14pImg,
  'iphone 14 pro max': iphone14pmImg,
};

const dbRef = firebase.database().ref('cart');

export function Catalog() {
  const [products, setProducts] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateProducts = (snapshot) => {
      const productsObj = snapshot.val();
      if (productsObj) {
        const productsArr = Object.values(productsObj);
        setProducts(productsArr);
      }
    };

    dbRef.on('value', updateProducts);

    return () => {
      dbRef.off('value', updateProducts);
    };
  }, []);

  useEffect(() => {
    const getExchangeRate = () => {
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
          const blueDollar = data.find(x => x.casa.nombre === 'Dolar Blue');
          const exchangeRateValue = parseFloat(blueDollar.casa.venta.replace(',', '')) + 4;
          setExchangeRate(exchangeRateValue);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching exchange rate:', error);
          setError('Error fetching exchange rate. Please try again later.');
        });
    };

    getExchangeRate();
    const interval = setInterval(() => {
      getExchangeRate();
    }, 1000 * 60 * 10); // actualiza la cotización cada 10 minutos

    return () => clearInterval(interval);
  }, []);

  const getPriceInARS = (price) => {
    const priceInARS = (price / 100) * (exchangeRate + 300);
    return priceInARS.toLocaleString();
  };

  return (
    <div className="catalogo">
      {error && <div className="error-message">{error}</div>}
      {products.map((product) => (
        <div
          className={`product-card ${
            product.estado === 'Nuevo' ? 'new-product' : 'used-product'
          }`}
          key={product.key}
        >
          <img
            className="product-image"
            src={images[product.name.toLowerCase()]}
            alt={`Imagen de ${product.name}`}
            data-name={product.name}
            data-color={product.color}
            data-mem={product.memoria}
            data-bat={product.bat}
          />
          
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">Memoria: {product.memoria}Gb</p>
            <p className={`product-description ${
              product.bat < 10 && product.estado === 'Nuevo' ? 'new-product' :
              product.bat >= 90 ? 'green' :
              product.bat >= 80 ? 'orange' :
              'red'
            }`}>
              Bateria: <span className="battery">{product.bat}%</span>
            </p>
            <p className="product-price">${getPriceInARS(product.price)}</p>
            <div className="product-buttons">
              <button className="buy-button">Comprar</button>
              <button className="details-button">Ver más</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}
  
