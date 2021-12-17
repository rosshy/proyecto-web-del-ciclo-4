import { gql } from '@apollo/client';

const New_Project = gql`
    mutation AddProject(
        $Nombre: String!, 
        $Ob_Generales: String!, 
        $Ob_Especificos: String!, 
        $Presupuesto: Float!, 
        $Lider: String!
    ) {
        addProject(
            Nombre: $Nombre, 
            Ob_Generales: $Ob_Generales, 
            Ob_Especificos: $Ob_Especificos, 
            Presupuesto: $Presupuesto, 
            Lider: $Lider
        ) {
        _id
        Nombre
        }
    }
`;
const Add_Advance = gql `
    mutation AddAdvance(
        $proyecto: String!, 
        $Estudiante: String!, 
        $Descripcion: String!
        ) {
        addAdvance(
            Proyecto: $proyecto, 
            Estudiante: $Estudiante, 
            Descripcion: $Descripcion
        ) {
            _id
        }
    }
`;
const Add_inscription = gql`
    mutation AddInscription(
        $proyecto: String!, 
        $Estudiante: String!
    ) {
        addInscription(
            Proyecto: $proyecto, 
            Estudiante: $Estudiante
        ) {
            _id
        }
    }
`;
const Update_Project = gql`
    mutation UpdateProject(
        $id: ID!, 
        $Nombre: String, 
        $Ob_Generales: String, 
        $Ob_Especificos: String, 
        $Presupuesto: Float, 
        $Estado: Estado_Proj,
        $Fase: Fase_Proj
    ) {
        updateProject(
            _id: $id,
            Nombre: $Nombre,
            Ob_Generales: $Ob_Generales,
            Ob_Especificos: $Ob_Especificos,
            Presupuesto: $Presupuesto,
            Estado: $Estado,
            Fase: $Fase
        )
    }
`;
const Update_Inscription = gql`
    mutation UpdateInscription(
        $id: ID!, 
        $Estado: StateInscription!
    ) {
        updateInscription(
            _id: $id, 
            Estado: $Estado
        )
    }
`;
const Update_Advance = gql`
    mutation UpdateAdvance(
        $id: ID!, 
        $Observaciones: String
        $Descripcion: String
    ) {
        updateAdvance(
            _id: $id, 
            Observaciones: $Observaciones
            Descripcion: $Descripcion
        )
    }
`;
const Add_Observation = gql`
    mutation AddAdvance(
        $proyecto: String!, 
        $estudiante: String!, 
        $descripcion: String!
    ) {
        addAdvance(
            Proyecto: $proyecto, 
            Estudiante: $estudiante, 
            Descripcion: $descripcion
        ) {
            _id
        }
    }
`;

export { 
    New_Project, Update_Project, Update_Inscription, 
    Add_Observation, Update_Advance, Add_Advance,
    Add_inscription
}