
import 'boxicons'
import React, { useState } from 'react';
import iphone11 from './img/12.svg';
import iphone12 from './img/12.svg';
import iphone13 from './img/13.svg';
import iphone14 from './img/14.svg';
import iphone14pro from './img/14p.svg';
import './style.css';
import { Link } from 'react-router-dom';




export const Navbar = () => {
  const [showIphones, setShowIphones] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const handleIphoneClick = () => {
    setShowIphones(!showIphones);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowLinks(!showLinks);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to= "/" className="navbar__logo">
          Apple Store RC
        </Link>
      </div>
      <div className={`navbar__right ${showMenu ? "active" : ""}`}>
        <ul className={`navbar__links ${showLinks ? "" : "navbar__links--hidden"}`}>
          <div className="navbar__dropdown"></div>
          <li>
            <a href="# " className="navbar__btn" onClick={handleIphoneClick}>
              iPhone Nuevos
            </a>
          </li>
          <li>
            <a href=" ">iPhone Usados</a>
          </li>
          <li>
            <a href=" ">Plan Canje</a>
          </li>
          <li>
            <a href=" ">Nosotros</a>
          </li>
        </ul>
        <button className="navbar__menu-icon" onClick={handleMenuClick}>
          <box-icon color="white" name="menu"></box-icon>
        </button>
      </div>
      <div className="cart">
        <box-icon color="white" name="cart"></box-icon>
        <span className="item__total">0</span>
      </div>
      {showIphones && (
        <div className="iphone__dropdown">
          <div>
            <a href="# ">
              <img src={iphone11} alt="iPhone 11" />
              <p>iPhone 11</p>
            </a>
          </div>
          <div>
            <a href="# ">
              <img src={iphone12} alt="iPhone 12" />
              <p>iPhone 12</p>
            </a>
          </div>
          <div>
            <a href="# ">
              <img src={iphone13} alt="iPhone 13" />
              <p>iPhone 13</p>
            </a>
          </div>
          <div>
          <Link to="/iph14">
              <img src={iphone14} alt="iPhone 14" />
              <p>iPhone 14</p>
            </Link>
          </div>
          <div>
            <a href="# ">
              <img src={iphone14pro} alt="iPhone 14 Pro" />
              <p>iPhone 14 Pro</p>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
