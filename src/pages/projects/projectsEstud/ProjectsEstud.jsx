import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import IconAdd from '../../../components/images/iconAdd.png';
import IconProject from '../../../components/images/iconProyects.png';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { Add_Advance, Update_Advance, Add_inscription } from '../../../graphql/projects/Mutations';
import { Get_Projects, Get_AdvanceByID } from '../../../graphql/projects/Queries';

export default function ProjectsEstud() {

    const { loading, error, data } = useQuery(Get_Projects);
    const [addAdvance, { error : errorAddAdv }] = useMutation(Add_Advance);
    const [updateAdvance, { error : errorUpAdv }] = useMutation(Update_Advance);
    const [addInscription, { error : errorAddInsc }] = useMutation(Add_inscription);
    const [getAdvances, { loading : loadAdvances, error : errorAdvances, data : dataAdvances }] = useLazyQuery(Get_AdvanceByID);

    const [idProject, setIdProject] = useState('');
    const [nameProject, setNameProject] = useState('');
    const [objGener, setObjGener] = useState('');
    const [objEspec, setObjEspec] = useState('');
    const [presup, setPresup] = useState(0);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState(''); 
    const [Descripcion, setDescripcion] = useState(''); 
    const Estudiante = "61aa7f43f121e13401f152b7";

    useEffect(() => {      
        if (error || errorAdvances || errorAddAdv || errorUpAdv || errorAddInsc) { 
            Swal.fire({
                icon: 'error',
                title: 'Lo Siento, Algo Salio Mal!!',
                text: 'Error al consultar los datos de los proyectos',
            });  
        }                
    }, [data, error, dataAdvances, errorAdvances, errorAddAdv, errorUpAdv, errorAddInsc]); 
    
    function update(tipo, accion) {        
        Swal.fire({
            icon: 'success',
            title: `${tipo} ${accion} con Exito!!`,
            showConfirmButton: false,
            timer: 2000
        }); 
    }
    function fecha(fecha) {
        const newFecha = fecha.split("T"); 
        return newFecha[0];
    }   

    if (loading) { 
        return <div className="container"><h5 className='container pt-5'>Loading Data ...</h5></div> } 

    return (        
        <div className="bodyLider">
            <div className="container">
                <img id="iconProject" src={ IconProject } alt="Project" />
                <h2 id="titleLogo">Gestion de Proyectos - Estudiante</h2>
                <hr className="hrProject" />
            </div>
            <div id="containMain" className="container border mt-5">
                <div className="container mt-4">
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
                                            <button type="button" className="btn btn-primary btn-sm btnCardColor" onClick={ () => {
                                                addInscription({ variables: { proyecto: project._id, Estudiante } }); 
                                                update("Solicitud", "Inscripcion"); } } >
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
                                    <input readOnly type="text" className="form-control form-control-sm" value={ nameProject } />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label-sm">Objetivos Generales</label>
                                    <textarea readOnly className="form-control form-control-sm" value={ objGener } />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label-sm">Objetivos Especificos</label>
                                    <textarea readOnly className="form-control form-control-sm" value={ objEspec } />                                        
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label-sm">Presupuesto</label>
                                    <input readOnly type="number" className="form-control form-control-sm" value={ presup } />
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
                            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalEditAdvanceStudent"
                                onClick={ () => { getAdvances({ variables: { id: idProject } }) } }>
                                Ver Avances
                            </button>
                            <button type="button" className="btn btn-primary btnColor" onClick={ () => {
                                addInscription({ variables: { proyecto: idProject, Estudiante } }); 
                                update("Solicitud", "Inscripcion"); } }>Inscribirme!!</button>
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
                                        <th>ID Estud.</th>
                                        <th>Nombre</th>
                                        <th>Fecha</th>
                                        <th>Descripcion</th>
                                        <th>Observaciones</th>
                                        <th>Editar</th>
                                    </tr>                                        
                                </thead>
                                <tbody>      
                                {
                                    loadAdvances ? <tr><td>Loading Data ...</td></tr> : 
                                    dataAdvances && dataAdvances.filterAdvance.map(advance => {
                                        return(
                                            <tr>
                                                <th>{ advance.Estudiante.Identificacion }</th>
                                                <td>{ `${advance.Estudiante.Nombre} ${advance.Estudiante.Apellido}` }</td>
                                                <td>{ fecha(advance.Fecha) }</td>
                                                <td>
                                                    { advance.Estudiante._id === Estudiante ? 
                                                    <textarea className="form-control form-control-sm" placeholder={ advance.Descripcion } 
                                                    onChange={ e => { setDescripcion(e.target.value) } }/> : 
                                                    <textarea disabled className="form-control form-control-sm" placeholder={ advance.Descripcion } /> }                                                    
                                                </td>
                                                <td><textarea readOnly className="form-control form-control-sm" value={ advance.Observaciones } /></td>   
                                                <td>
                                                    { advance.Estudiante._id === Estudiante ? 
                                                    <button id="btnAdd" onClick={ () => { updateAdvance({ variables: { id: advance._id,
                                                        Descripcion } }); update("Descripcion", "Actualizada"); 
                                                        getAdvances({ variables: { id: idProject } }); } }>
                                                        <img id="iconAdd" src={ IconAdd } alt="Add Commit" title="Agregar Descripcion" />
                                                    </button> : null }                                                    
                                                </td>                                         
                                            </tr>      
                                        )
                                    })
                                }                                                    
                                </tbody>
                            </table>                                
                        </div>
                        <div className="container mb-4 ">
                            <div className="col-md-12">
                                <h6 className='m-3 mt-0'>Agregar un avance (Descripcion)</h6>
                                <div className="container">
                                    <textarea className="form-control form-control-sm mt-2" onChange={ e => { setDescripcion(e.target.value) } }
                                        placeholder="Agregue aqui la descripcion del avance que desea realizar" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" 
                                data-bs-target="#modalEditProjectStudent">
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary btnCardColor" onClick={ () => { addAdvance({ variables: {
                                proyecto: idProject, Estudiante: Estudiante, Descripcion } }); update("Avance", "Creado"); 
                                getAdvances({ variables: { id: idProject } }); } }>
                                Agregar Descripcion
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
