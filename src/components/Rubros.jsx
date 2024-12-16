import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RUBROS } from '../queries/getRubros'

const Rubros = () => {
  const { loading, error, data } = useQuery(GET_RUBROS);
  console.log(data)
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error : {error.message}</p>
  // Filtrar rubros por tipo
  const ingresos = data.obtenerRubros.filter((rubro) => rubro.tipo === 'ingresos');
  const gastos = data.obtenerRubros.filter((rubro) => rubro.tipo === 'gastos');
  const inversion = data.obtenerRubros.find((rubro) => rubro.tipo === 'inversion');

  // Calcular totales de ingresos y gastos
  const totalIngresos = ingresos.reduce(
    (total, rubro) =>
      total +
      rubro.subRubros.reduce((subTotal, subRubro) => subTotal + subRubro.presupuestoTotal, 0),
    0
  );

  const totalGastos = gastos.reduce(
    (total, rubro) =>
      total +
      rubro.subRubros.reduce((subTotal, subRubro) => subTotal + subRubro.presupuestoTotal, 0),
    0
  );

  
  // Calcular el presupuesto total de inversión
  const totalInversion = totalIngresos - totalGastos;

  //console.log(totalInversion)

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Mostrar tarjetas para ingresos y gastos */}
        {[...ingresos, ...gastos].map((rubro) => {
          // Calcula el presupuesto total del rubro sumando los presupuestos de los subrubros
          const presupuestoTotal = rubro.subRubros.reduce(
            (total, subRubro) => total + subRubro.presupuestoTotal,
            0
          );

          return (
            <div className="col-md-4 mb-4" key={rubro.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">{rubro.tipo.toUpperCase()}</h5>
                  <ul className="list-group list-group-flush">
                    {rubro.subRubros.map((subRubro) => (
                      <li key={subRubro.id} className="list-group-item">
                        {subRubro.nombre}: ${subRubro.presupuestoTotal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <strong className="d-block text-center">
                    Presupuesto Total: ${presupuestoTotal}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}

        {/* Mostrar tarjeta para inversión */}
        {inversion && (
          <div className="col-md-4 mb-4" key={inversion.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-center">{inversion.tipo.toUpperCase()}</h5>
                <ul className="list-group list-group-flush">
                  {inversion.subRubros.map((subRubro) => (
                    <li key={subRubro.id} className="list-group-item">
                      {subRubro.nombre}: ${subRubro.presupuestoTotal}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <strong className="d-block text-center">
                  
                  Presupuesto disponible para Inversión: ${totalInversion}
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rubros;