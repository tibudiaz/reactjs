import React from 'react'
import 'boxicons';

export const Header = () => {
    return (
        <header className="Superior">
        <h1>Apple Store Rc</h1>
        <div className="menu">
            <box-icon color="white" name="menu"></box-icon>
        </div>
        <ul>
            <li>
                <a href=' '>iPhone Nuevos</a>
                <a href=' '>iPhone Usados</a>
                <a href=' '>Plan Canje</a>
                <a href=' '>Nosotros</a>
            </li>
        </ul>
        <div className="cart">
        <box-icon color="white" name="cart"></box-icon>
        <span className='item__total'>0</span>
        </div>        
        </header>       
    )
}

