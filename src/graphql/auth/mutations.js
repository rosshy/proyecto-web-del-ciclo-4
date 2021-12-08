import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $Nombre: String!
    $Apellido: String!
    $Identificacion: String!
    $Email: String!
    $Rol: Enum_Rol!
    $Password: String!
  ) {
    registro(
      Nombre: $Nombre
      Apellido: $Apellido
      Identificacion: $Identificacion
      Email: $Email
      Rol: $Rol
      Password: $Password
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login($Email: String!, $Password: String!) {
    login(Email: $Email, Password: $Password) {
      token
      error
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };