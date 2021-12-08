import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation UpdateUser(
    $_id: String!
    $identificacion: String!
    $nombre: String!
    $apellido: String!
    $email: String!
    $password: String!
    $estado: Enum_Estado!
  ) {
    updateUser(
      Identificacion: $identificacion
      _id: $_id
      Nombre: $nombre
      Apellido: $apellido
      Email: $email
      Password: $password
      Estado: $estado
    ) {
      _id
      Identificacion
      Nombre
      Apellido
      Email
      Password
      Estado
    }
  }
`;

export { EDITAR_USUARIO };