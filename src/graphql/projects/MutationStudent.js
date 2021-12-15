import { gql } from '@apollo/client';

const Add_inscription = gql`
    mutation AddInscription(
        $proyecto: String!, 
        $estudiante: String!
    ) {
        addInscription(
            Proyecto: $proyecto, 
            Estudiante: $estudiante
        ) {
            _id
            Estado
            Fecha_Ingreso
            Fecha_Egreso
        }
    }
`;

export { Add_inscription }