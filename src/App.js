import React from "react";
import { Header } from "./componentes/Header";
import { ProductosLista } from "./componentes/Productos/index";
import { Propaganda } from "./componentes/Cuerpo"

function App() {
  return (
    <div className="App">
        <Header />
        <Propaganda />
        <ProductosLista />
    </div>
  );
}

export default App;
