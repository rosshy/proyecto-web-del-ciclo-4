import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query AllUsers($filtro: Enum_Rol) {
    allUsers(Rol: $filtro) {
        _id
        Identificacion
        Nombre
        Apellido
        Email
        Password
        Rol
        Estado
    }
  }
`;

const GET_USUARIO = gql`
  query GetOneUser($_id: String!) {
    getOneUser(_id: $_id) {
        _id
        Identificacion
        Nombre
        Apellido
        Email
        Password
        Rol
        Estado
      }
  }
`;

export { GET_USUARIOS, GET_USUARIO };