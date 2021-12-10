import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation UpdateUser(
    $_id: String!
    $Identificacion: String!
    $Nombre: String!
    $Apellido: String!
    $Email: String!
    $Estado: Enum_Estado!
  ) {
    updateUser(
      _id: $_id
      Identificacion: $Identificacion
      Nombre: $Nombre
      Apellido: $Apellido
      Email: $Email
      Estado: $Estado
    ) {
      _id
      Identificacion
      Nombre
      Apellido
      Email
      Estado
    }
  }
`;

export { EDITAR_USUARIO };