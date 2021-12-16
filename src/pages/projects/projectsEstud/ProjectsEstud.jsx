import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import IconProject from '../../../components/images/iconProyects.png';
import { Get_ProjectsStudent } from '../../../graphql/projects/QueriesStudent';

export default function ProjectsEstud() {

    const { loading, error, data } = useQuery(Get_ProjectsStudent);
    const [idProject, setIdProject] = useState('');
    const [nameProject, setNameProject] = useState('');
    const [objGener, setObjGener] = useState('');
    const [objEspec, setObjEspec] = useState('');
    const [presup, setPresup] = useState(0);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState(''); 

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
            title: 'Se ha agregado el nuevo avance!!',
            showConfirmButton: false,
            timer: 2000
        }); 
    }

    return (
        <div>
            <div className="bodyLider">
                <div className="container">
                    <img id="iconProject" src={ IconProject } alt="Project" />
                    <h2 id="titleLogo">Gestion de Proyectos - Estudiante</h2>
                    <hr className="hrProject" />
                </div>
                <div className="container border mt-4">
                    <h4 className='m-5'>{ <i className="fab fa-buffer iconArray" /> }Proyectos Registrados en la Plataforma</h4> 
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
                                        <section className="mt-1">
                                            <button type="button" className="btn btn-secondary btn-sm btn2 mb-1" data-bs-toggle="modal" 
                                                data-bs-target="#modalEditProjectStudent" onClick={ () => {
                                                    setIdProject(project._id); setNameProject(project.Nombre); setObjGener(project.Ob_Generales);
                                                    setObjEspec(project.Ob_Especificos); setPresup(project.Presupuesto); 
                                                    setFechaInicio(project.Fecha_Inicio); setFechaFin(project.Fecha_Terminacion);
                                                } }>
                                                Ver Proyecto Completo
                                            </button>     
                                            <button type="button" className="btn btn-primary btn-sm btnCardColor" onClick={ update } >
                                                Inscribirme!!
                                            </button>     
                                        </section>                                                             
                                    </div>
                                </div>
                            </div>                                      
                        )
                    }
                    </div>
                </div>
                <div className="modal fade" id="modalEditProjectStudent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header headColor">
                                <h5 className="modal-title" id="exampleModalLabel">Ver Detalles del Proyecto y Actualizar</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body m-3 mt-1">                                
                                <form className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label-sm">ID del Proyecto</label>
                                        <input readOnly type="text" className="form-control form-control-sm" value={ idProject } />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-sm">Nombre del Proyecto</label>
                                        <input readOnly type="text" className="form-control form-control-sm" placeholder={ nameProject } />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label-sm">Objetivos Generales</label>
                                        <textarea readOnly className="form-control form-control-sm" placeholder={ objGener } />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label-sm">Objetivos Especificos</label>
                                        <textarea readOnly className="form-control form-control-sm" placeholder={ objEspec } />                                        
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label-sm">Presupuesto</label>
                                        <input readOnly type="number" className="form-control form-control-sm" placeholder={ presup } />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label-sm">Fecha de Inicio</label>
                                        <input readOnly type="text" className="form-control form-control-sm" value={ fechaInicio } />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label-sm">Fecha de Terminacion</label>
                                        <input readOnly type="text" className="form-control form-control-sm" value={ fechaFin } />
                                    </div>
                                </form>                                    
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-dark" data-bs-toggle="modal" 
                                    data-bs-target="#modalEditAdvanceStudent">
                                    Ver Avances
                                </button>
                                <button type="button" className="btn btn-primary btnColor" onClick={ update }>Inscribirme!!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalEditAdvanceStudent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header headColor">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Avances del Proyecto actual y Agregar un nuevo Avance
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body m-3 mt-0">
                                <legend className='divModalAdvances'>{ <i className="fab fa-angular iconArray" /> }Avances del Proyecto</legend>
                                <table className="table table-striped table-hover table-sm">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>ID Estudiante</th>
                                            <th>Fecha</th>
                                            <th>Descripcion</th>
                                            <th>Observaciones</th>
                                            <th></th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>                                                          
                                        <tr>
                                            <td>61aa7f60f121e13401f152ba</td>
                                            <td>2021-12-15T01:40:01.532Z</td>
                                            <td>Maria realizo esta descripcion</td>
                                            <td>No hay observaciones</td>   
                                            <td></td>                                         
                                        </tr>                                                                                    
                                        <tr>
                                            <td>61b14337d94a7a366257af9a</td>
                                            <td>2021-12-11T15:41:21.426Z</td>
                                            <td>Rosmy realiza esta descripcion</td>
                                            <td>Se agrega una observacion</td>   
                                            <td></td>                                           
                                        </tr>                                                                                    
                                        <tr>
                                            <td>61b291dd42668b9aacf0ec77</td>
                                            <td>2021-12-11T15:41:21.426Z</td>
                                            <td>Andres realiza esta descripcion</td>
                                            <td>El lider Johan agrega esta observacion</td>     
                                            <td></td>                                         
                                        </tr>                                                                                    
                                        <tr>
                                            <td>61aa7f43f121e13401f152b7</td>
                                            <td>2021-12-15T01:17:39.235Z</td>
                                            <td>Ahora modifico la descripcion por una nueva</td>
                                            <td>No hay observaciones</td>                                            
                                            <td><i className="fas fa-edit"></i></td>                                            
                                        </tr>                                                                                    
                                    </tbody>
                                </table>                                
                            </div>
                            <div className="container mb-4 ">
                                <div className="col-md-12">
                                    <h6 className='m-3 mt-0'>Agregar un avance (Descripcion)</h6>
                                    <div className="container">
                                        <textarea className="form-control form-control-sm mt-2" placeholder="Agregue aqui la descripcion del avance que desea realizar" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary btnCardColor" onClick={ update }>
                                    Agregar Descripcion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}
