import { gql } from "@apollo/client";

export const GET_RUBROS = gql`
query ObtenerRubros {
  obtenerRubros {
    id
    tipo
    subRubros {
      id
      nombre
      presupuestoTotal
      presupuestoGastado
    }
  }
}
`;