import Swal from 'sweetalert2';
import { useQuery } from '@apollo/client';
import React, { useEffect }  from 'react';
import IconProject from '../../../components/images/iconProyects.png';
import { Get_ProjectsAdmin } from '../../../graphql/projects/QueriesAdmin';

export default function ProjectsAdmin() {

    const { loading, error, data } = useQuery(Get_ProjectsAdmin);

    useEffect(() => {      
        if (error) { 
            Swal.fire({
                icon: 'error',
                title: 'Lo Siento, Algo Salio Mal!!',
                text: 'Error al consultar los datos de los proyectos',
            });  
        }                
    }, [data, error]); 

    if (loading) { return <div className="container"><h5>Loading Data ...</h5></div> } 

    function update() {        
        Swal.fire({
            icon: 'success',
            title: 'El Proyecto ha sido Actualizado!!',
            showConfirmButton: false,
            timer: 2000
        }); 
    }

    return (
        <div className="bodyLider">
            <div className="container">
                <img id="iconProject" src={ IconProject } alt="Project" />
                <h2 id="titleLogo">Gestion de Proyectos - Administrador</h2>
                <hr className="hrProject" />
            </div>
            <div className="container border mt-4">
                <h4 className='m-5'>{ <i className="fab fa-buffer iconArray" /> } Proyectos Registrados</h4> 
                <div className=" row g-3">
                {
                    data.allProjects.map( project =>                            
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
                                        <select className="form-select form-select-sm mb-1" aria-label=".form-select-sm example">
                                            <option disabled selected>Cambiar Estado del Proyecto</option>
                                            <option value="INACTIVO">INACTIVO</option>
                                            <option value="ACTIVO">ACTIVO</option>
                                        </select>
                                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                            <option disabled selected>Cambiar la Fase del Proyecto</option>
                                            <option value="INICIADO">INICIADO</option>
                                            <option value="EN_DESARROLLO">EN_DESARROLLO</option>
                                            <option value="TERMINADO">TERMINADO</option>
                                        </select>
                                    </section>                                          
                                    <section className="mt-1">
                                        <button type="button" className="btn btn-secondary btn-sm btnCardColor" onClick={ update } >
                                            Actualizar Proyecto
                                        </button>     
                                    </section>                                                             
                                </div>
                            </div>
                        </div>                                      
                    )
                }
                </div>
            </div>
        </div>
    )
}
