import { gql } from '@apollo/client';

const Edit_Proyect = gql`
    mutation UpdateProject(
        $id: ID!, 
        $estado: Estado_Proj,
        $fase: Fase_Proj
    ) {
        updateProject(
            _id: $id, 
            Estado: $estado,
            Fase: $fase
        )
    }
`;

export { Edit_Proyect }