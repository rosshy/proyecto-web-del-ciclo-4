import Swal from 'sweetalert2';
import './css/styleProjectPage.css';
import { useQuery } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import IconAdd from '../../../components/images/iconAdd.png';
import IconAcept from '../../../components/images/iconAcept.png';
import IconCancel from '../../../components/images/iconCancel.png';
import IconProject from '../../../components/images/iconProyects.png';
import { Get_ProjectsLider, Get_Advances, Get_Inscriptions } from '../../../graphql/projects/QueriesLider';

export default function ProjectsPage() {

    const icons = [
        <i className="fas fa-external-link-alt" />, 
        <i className="fab fa-angular iconArray" />, 
        <i className="fab fa-buffer iconArray" />
    ];

    const [advance, setAdvance] = useState([]);  
    const { loading, error, data } = useQuery(Get_ProjectsLider);
    const [getAdvances] = useLazyQuery(Get_Advances, { onCompleted: data => setAdvance(data.filterAdvance) });
    const [getInscriptions, { loading:loadInscrip, error:errInscrip, data:dataInscrip }] = useLazyQuery(Get_Inscriptions);
    
    const [idProject, setIdProject] = useState('');
    const [nameProject, setNameProject] = useState('');
    const [objGener, setObjGener] = useState('');
    const [objEspec, setObjEspec] = useState('');
    const [presup, setPresup] = useState(0);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');  
    const Usuario = { _id: "61aa7f43f121e13401f152b7" };

    useEffect(() => {      
        if (error || errInscrip) { 
            Swal.fire({
                icon: 'error',
                title: 'Lo Siento, Algo Salio Mal!!',
                text: 'Error al consultar los datos de los proyectos',
            });  
        }                
    }, [data, error, errInscrip, dataInscrip]);    

    if (dataInscrip && dataInscrip.filterInscription) {
        console.log(dataInscrip.filterInscription);
    }        
          
    function fecha(fecha) {
        const newFecha = fecha.split("T"); 
        return newFecha[0];
    }    
    function update() {        
        Swal.fire({
            icon: 'success',
            title: 'El Proyecto ha sido Actualizado con exito!!',
            showConfirmButton: false,
            timer: 2000
        }); 
    }

    if (loading) { return <div className="container"><h5>Loading Data ...</h5></div> } 

    return (
        <div className="bodyLider"> 
            <div className="container">
                <img id="iconProject" src={ IconProject } alt="Project" />
                <h2 id="titleLogo">Modulo de Gestion de Proyectos</h2>
                <hr className="hrProject" />
            </div>
            <div id="containMain" className="container border mt-5">
                <form className="row g-3 m-4 mt-2">
                    <div> <legend>{ icons[0] } Registrar un Nuevo Proyecto</legend> </div>                                      
                    <div className="col-md-6">
                        <label htmlFor="inputNomP" className="form-label">Nombre del Proyecto</label>
                        <input type="text" className="form-control" id="inputNomP" 
                            placeholder="Digite el nombre que le dara al proyecto" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputID" className="form-label">Presupuesto Proyecto</label>
                        <input type="number" className="form-control" id="inputID" 
                            placeholder="Digite el presupuesto que tendra el proyecto" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="floatingTextarea" className="form-label">Objetivos Generales</label>
                        <textarea className="form-control" placeholder="Introduce aqui los objetivos generales del Proyecto, 
                            puedes enlistarlos." id="floatingTextarea"></textarea>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Objetivos Especificos</label>
                        <textarea className="form-control" placeholder="Introduce aqui los objetivos especificos del Proyecto, 
                            puedes enlistarlos." id="floatingTextarea"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputNomP" className="form-label">Numero Identificador Lider</label>
                        <input type="text" className="form-control" id="inputNomP" placeholder="Identificacion del lider del proyecto" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputID" className="form-label">Nombre Lider de Proyecto</label>
                        <input type="text" className="form-control" id="inputID" placeholder="Nombre del Lider del proyecto" />
                    </div>
                    <div className="setDivProject col-md-6 mt-5">
                        <button className="btn btn-secondary setBtnProject" type="reset" >Limpiar Campos</button>                        
                    </div>   
                    <div id="div2Project" className="setDivProject col-md-6 mt-5">
                        <button className="btn btn-primary setBtnProject btnColor" type="button" onClick={ update }>
                            Registrar Proyecto !!
                        </button>                       
                    </div> 
                    <legend>{ icons[0] } Proyectos Registrados</legend> 
                    <div id="divCards" className="card-group row g-3">
                    { data &&
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
                                            <button type="button" className="btn btn-primary btn-sm btnCardColor" data-bs-toggle="modal" 
                                                data-bs-target="#modalEditProjectLider" onClick={ () => {
                                                    setIdProject(project._id); setNameProject(project.Nombre); setObjGener(project.Ob_Generales);
                                                    setObjEspec(project.Ob_Especificos); setPresup(project.Presupuesto); 
                                                    setFechaInicio(project.Fecha_Inicio); setFechaFin(project.Fecha_Terminacion);
                                                } }>
                                                Ver y/o Actualizar Proyecto
                                            </button>
                                        </section>                                          
                                        <section className="mt-1">
                                            <button type="button" className="btn btn-secondary btn-sm btn2" data-bs-toggle="modal" 
                                                data-bs-target="#modalAvance" onClick={ () => { 
                                                    getAdvances({ variables: { id: project._id } });  
                                                    getInscriptions({ variables: { id: project._id } });                                                   
                                                } }>
                                                Ver Avances e Inscripciones
                                            </button>     
                                        </section>                                                             
                                    </div>
                                </div>
                            </div>                                    
                        )
                    } 
                    </div>                                                             
                </form>                   
                <div className="modal fade" id="modalEditProjectLider" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <input type="text" className="form-control form-control-sm" placeholder={ nameProject } />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label-sm">Objetivos Generales</label>
                                        <textarea className="form-control form-control-sm" placeholder={ objGener } />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label-sm">Objetivos Especificos</label>
                                        <textarea className="form-control form-control-sm" placeholder={ objEspec } />                                        
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label-sm">Presupuesto</label>
                                        <input type="number" className="form-control form-control-sm" placeholder={ presup } />
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
                                <button type="button" className="btn btn-primary btnColor" onClick={ update }>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="modal fade" id="modalAvance" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header headColor">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Avances e Inscripciones al Proyecto actual
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => {  } } />
                            </div>
                            <div className="modal-body m-3 mt-0">
                                <legend className='divModalAdvances'>{ icons[1] }Avances del Proyecto</legend>
                                <table className="table table-striped table-hover table-sm">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Fecha</th>
                                            <th>Descripcion</th>
                                            <th>Observaciones</th>
                                            <th>Agregar</th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>  
                                        {     
                                            advance.map(advances => {                                            
                                                <tr>
                                                    {console.log(advance.length)}
                                                    <th>{ advances.Estudiante.Identificacion }</th>
                                                    <td>{ `${advances.Estudiante.Nombre} ${advances.Estudiante.Apellido}` }</td>
                                                    <td>{ fecha(advances.Fecha) }</td>
                                                    <td>{ advances.Descripcion }</td>
                                                    <td><input type="text" className="form-control form-control-sm" 
                                                        placeholder={ advances.Observaciones }/></td>
                                                    <td>
                                                        <button id="btnAdd">
                                                            <img id="iconAdd" src={ IconAdd } alt="Add Commit" title="Agregar Observacion"/>
                                                        </button>
                                                    </td>
                                                </tr>   
                                            })  
                                        }                                                        
                                    </tbody>
                                </table>
                                <legend className='divModalAdvances'>{ icons[2] }Estudiantes Inscritos</legend>
                                {/* <table className="table table-striped table-hover table-sm">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>ID Estudiante</th>
                                            <th>Fecha Ingreso</th>
                                            <th>Fecha Egreso</th>
                                            <th>Estado</th>
                                            <th>Accion</th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>{  }</th>
                                            <td>{  }</td>
                                            <td>{  }</td>
                                            <td>{  }</td>
                                            <td>
                                                <button className="btnAvance">
                                                    <img id="iconAdd" src={ IconAcept } alt="Add Student" title="Agregar Estudiante"/>
                                                </button>
                                                <button className="btnAvance">
                                                    <img id="iconAdd" src={ IconCancel } alt="Delete Student" title="Eliminra Estudiante"/>
                                                </button>
                                            </td>
                                        </tr>                                        
                                    </tbody>
                                </table> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ () => {  } }>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>                              
            </div> <br />            
        </div>
    )
}
