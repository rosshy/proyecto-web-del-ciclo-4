import { gql } from '@apollo/client';

const Get_ProjectsLider = gql`
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
const Get_Inscriptions = gql`
    query ($id: ID!) {
        filterInscription(_id: $id) {
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

export { Get_ProjectsLider, Get_Advances, Get_Inscriptions }
