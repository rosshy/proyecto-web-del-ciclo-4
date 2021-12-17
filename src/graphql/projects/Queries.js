import { gql } from '@apollo/client';

const Get_Projects = gql`
    query{
        allProjects {
            _id
            Nombre
            Ob_Generales
            Ob_Especificos
            Presupuesto
            Fecha_Inicio
            Fecha_Terminacion
            Estado
            Fase
            Lider {
                _id
                Identificacion
                Nombre
                Apellido
            }       
        }
    }
`;
const Get_Advances = gql`
    query AllAdvances {
        allAdvances {
            _id
            Fecha
            Descripcion
            Observaciones
            Proyecto {
                _id
            }
            Estudiante {
                Identificacion
                Nombre
                Apellido
            }
        }
    }
`;
const Get_AdvanceByID = gql`
    query FilterAdvance( $id: ID! ) {
        filterAdvance( _id: $id ) {
            _id
            Estudiante {
                _id
                Identificacion
                Nombre
                Apellido
            }
            Fecha
            Descripcion
            Observaciones
        }
    }
`;
const Get_Inscriptions = gql`
    query ($id: ID!) {
        filterInscription( _id: $id ) {
            _id
            Estudiante {
                Identificacion
                Nombre
                Apellido
            }
            Estado
            Fecha_Ingreso
            Fecha_Egreso
        }
    }
`;

export { Get_Projects, Get_Advances, Get_Inscriptions, Get_AdvanceByID }