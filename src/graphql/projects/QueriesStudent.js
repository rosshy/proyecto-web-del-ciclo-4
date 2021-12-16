import { gql } from '@apollo/client';

const Get_ProjectsStudent = gql`
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

export { Get_ProjectsStudent }