import React, { useState } from "react";
import PropTypes from "prop-types";

import Error from "./Error";
import shortid from "shortid";

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const agregarGastos = (e) => {
    e.preventDefault();

    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "")
      return guardarError(true);

    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate(),
    };

    guardarGasto(gasto);
    guardarCrearGasto(true);

    guardarNombre("");
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGastos}>
      <h2>Agrega tus gastos aquí</h2>

      {error ? (
        <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto." />
      ) : null}

      <div className="campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        ></input>
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
        ></input>
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar gasto"
      ></input>
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;
