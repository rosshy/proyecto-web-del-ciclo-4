import Swal from 'sweetalert2';
import React, { useEffect, useState }  from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Get_Projects } from '../../../graphql/projects/Queries';
import { Update_Project } from '../../../graphql/projects/Mutations';
import IconProject from '../../../components/images/iconProyects.png';

export default function ProjectsAdmin() {

    const [getProjects, { loading, error, data }] = useLazyQuery(Get_Projects);
    const [updateProject, { error : errorUpProj }] = useMutation(Update_Project);

    const [Fase, setFase] = useState('');
    const [Estado, setEstado] = useState('');

    useEffect(() => {  
        getProjects();  
        if (error || errorUpProj) { 
            Swal.fire({
                icon: 'error',
                title: 'Lo Siento, Algo Salio Mal!!',
                text: 'Error al consultar los datos de los proyectos',
            });  
        }                
        console.log(data);
    }, [data, error, errorUpProj, getProjects]);     
    
    function update() { 
        if (!error || !errorUpProj) {
            Swal.fire({
                icon: 'success',
                title: 'El Proyecto ha sido Actualizado!!',
                showConfirmButton: false,
                timer: 2000
            }); 
        } getProjects(); 
        setEstado(''); setFase('');           
    }
    
    if (loading) { 
        return <div className="container"><h5 className='container pt-5'>Loading Data ...</h5></div> } 

    return (
        <div className="bodyLider">
            <div className="container">
                <img id="iconProject" src={ IconProject } alt="Project" />
                <h2 id="titleLogo">Gestion de Proyectos - Administrador</h2>
                <hr className="hrProject" />
            </div>
            <div id="containMain" className="container border mt-5">
                <div className="container mt-4">
                    <h3 className='m-5'>{ <i className="fab fa-buffer iconArray" /> } Proyectos Registrados</h3> 
                    <div className=" row g-3">
                    { 
                        data && data.allProjects.map( project => {                                                     
                            return(                                
                                <div className="col-md-4">
                                    <div className="card text-dark mb-3">
                                        <div className="card-header headColor row g-0">
                                            <div className="col-md-3 mt-1"><i className="fas fa-shield-virus iconCard"></i></div>
                                            <div className="col-md-9">{ project.Nombre }</div>                                    
                                        </div>
                                        <div className="card-body">                                   
                                            <h5 className="card-title">{ project.Lider.Nombre } { project.Lider.Apellido }</h5>
                                            <small className="text-muted">ID Lider: { project.Lider._id }</small> <br />
                                            <small className="text-muted">Fecha de Inicio: { project.Fecha_Inicio }</small> <br />
                                            <small className="text-muted">Fase: { project.Fase }</small> <br />
                                            <small className="text-muted">Estado: { project.Estado }</small> 
                                        </div>
                                        <div className="card-footer btnCard">
                                            <section>
                                                <select className="form-select form-select-sm mb-1" aria-label=".form-select-sm example"
                                                    onChange={ e => { setEstado(e.target.value); } } >
                                                    <option disabled selected>Cambiar Estado del Proyecto</option>
                                                    <option value="INACTIVO">INACTIVO</option>
                                                    <option value="ACTIVO">ACTIVO</option>
                                                </select>
                                                <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={ e => {
                                                    setFase(e.target.value); } } >
                                                    <option disabled selected>Cambiar la Fase del Proyecto</option>
                                                    <option value="INICIADO">INICIADO</option>
                                                    <option value="EN_DESARROLLO">EN_DESARROLLO</option>
                                                    <option value="TERMINADO">TERMINADO</option>
                                                </select>
                                            </section>                                          
                                            <section className="mt-1">
                                                <button type="button" className="btn btn-secondary btn-sm btnCardColor" onClick={ () => {  
                                                    if (Fase !== "" && Estado !== "") { 
                                                        updateProject({ variables: { id: project._id, Fase, Estado } }); update(); }  
                                                    else { 
                                                        if (Estado !== "") { 
                                                            updateProject({ variables: { id: project._id, Estado, Fase: "INICIADO" } }); update(); } 
                                                        else { if (Fase !== "") { updateProject({ variables: { id: project._id, Fase } }); update(); } } 
                                                    } } } >
                                                    Actualizar Proyecto
                                                </button>     
                                            </section>                                                             
                                        </div>
                                    </div>
                                </div>  
                            )
                        } ) 
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
