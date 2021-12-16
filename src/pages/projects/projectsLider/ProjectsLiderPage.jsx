import Swal from 'sweetalert2';
import './css/styleProjectPage.css';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import IconAdd from '../../../components/images/iconAdd.png';
import IconAcept from '../../../components/images/iconAcept.png';
import IconCancel from '../../../components/images/iconCancel.png';
import IconProject from '../../../components/images/iconProyects.png';
import { Get_ProjectsLider, Get_Advances, Get_Inscriptions } from '../../../graphQL/Projects/QueriesLider';
import { New_Project } from '../../../graphQL/Projects/MutationLider';

export default function ProjectsPage() {

    const icons = [
        <i className="fas fa-external-link-alt" />, 
        <i className="fab fa-angular iconArray" />, 
        <i className="fab fa-buffer iconArray" />
    ];

    const [getProjects, { loading, error, data }] = useLazyQuery(Get_ProjectsLider);
    const { loading : loadAdvance, error : errorAdvance, data : dataAdvance } = useQuery(Get_Advances);
    const [getInscriptions, { loading : loadInsc, data : dataInsc }] = useLazyQuery(Get_Inscriptions);
    const [addProject, { data : dataProject, loading : loadProject, error : errorProject }] = useMutation(New_Project);
    
    const [idProject, setIdProject] = useState('');
    const [nameProject, setNameProject] = useState('');
    const [objGener, setObjGener] = useState('');
    const [objEspec, setObjEspec] = useState('');
    const [presup, setPresup] = useState(0);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');  
    const [idSearch, setIdSearch] = useState('');   
    const [Nombre, setNombre] = useState('');   
    const [Ob_Generales, setOb_Generales] = useState('');   
    const [Ob_Especificos, setOb_Especificos] = useState('');   
    const [Presupuesto, setPresupuesto] = useState(0);   
    const [Lider, setLider] = useState('');   

    useEffect(() => {  
        getProjects();    
        if (error || errorAdvance || errorProject) { 
            Swal.fire({
                icon: 'error',
                title: 'Lo Siento, Algo Salio Mal!!',
                text: 'Error al consultar los datos de los proyectos',
            });  
        }                
    }, [data, error, dataAdvance, errorAdvance, dataInsc, errorProject, dataProject, getProjects]);    
          
    function fecha(fecha) {
        const newFecha = fecha.split("T"); 
        return newFecha[0];
    }    
    function update() {   
        if (!errorProject) {
            Swal.fire({
                icon: 'success',
                title: 'El Proyecto ha sido Creado con exito!!',
                showConfirmButton: false,
                timer: 2000
            }); 
        } getProjects(); 
    }

    if (loading || loadAdvance) { 
        return <div className="container"><h5 className='container pt-5'>Loading Data ...</h5></div> } 

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
                        <input type="text" className="form-control" id="inputNomP" autoComplete="none"
                            placeholder="Digite el nombre que le dara al proyecto" onChange={ e => { setNombre(e.target.value) } }/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputID" className="form-label">Presupuesto Proyecto</label>
                        <input type="number" className="form-control" id="inputID" onChange={ e => { setPresupuesto(parseInt(e.target.value)) } }
                            placeholder="Digite el presupuesto que tendra el proyecto" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="floatingTextarea" className="form-label">Objetivos Generales</label>
                        <textarea className="form-control" placeholder="Introduce aqui los objetivos generales del Proyecto, 
                            puedes enlistarlos." id="floatingTextarea" onChange={ e => { setOb_Generales(e.target.value) } }></textarea>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Objetivos Especificos</label>
                        <textarea className="form-control" placeholder="Introduce aqui los objetivos especificos del Proyecto, 
                            puedes enlistarlos." id="floatingTextarea" onChange={ e => { setOb_Especificos(e.target.value) } }></textarea>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputNomP" className="form-label">Numero Identificador Lider</label>
                        <input type="text" className="form-control" id="inputNomP" onChange={ e => { setLider(e.target.value) } }
                            placeholder="Numero de Identificacion del lider del proyecto que se esta creando" />
                    </div>
                    <div className="setDivProject col-md-6 mt-5">
                        <button className="btn btn-secondary setBtnProject" type="reset" >Limpiar Campos</button>                        
                    </div>   
                    <div id="div2Project" className="setDivProject col-md-6 mt-5">
                        <button className="btn btn-primary setBtnProject btnColor" type="button" onClick={ () => {  
                            addProject({ variables: { Nombre, Presupuesto, Ob_Generales, Ob_Especificos, Lider } }); update(); } }>
                            Registrar Proyecto !!
                        </button>                       
                    </div> 
                    <legend>{ icons[0] } Proyectos Registrados</legend> 
                    <div id="divCards" className="card-group row g-3">
                    { data.allProjects.map( project =>                                                    
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
                                                setIdSearch(project._id); 
                                                getInscriptions({ variables: { id: project._id } });
                                            } }>
                                            Ver Avances e Inscripciones
                                        </button>     
                                    </section>                                                             
                                </div>
                            </div>
                        </div>                                  
                    ) } 
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
                                            <th>ID Estud.</th>
                                            <th>Nombre</th>
                                            <th>Fecha</th>
                                            <th>Descripcion</th>
                                            <th>Observaciones</th>
                                            <th>Agregar</th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>                                          
                                        { dataAdvance.allAdvances.map(advance => { 
                                            if (advance.Proyecto._id === idSearch) {
                                                return (
                                                <tr>
                                                    <th>{ advance.Estudiante.Identificacion }</th>
                                                    <td>{ `${advance.Estudiante.Nombre} ${advance.Estudiante.Apellido}` }</td>
                                                    <td>{ fecha(advance.Fecha) }</td>
                                                    <td>{ advance.Descripcion }</td>
                                                    <td><input type="text" className="form-control form-control-sm" 
                                                        placeholder={ advance.Observaciones }/></td>
                                                    <td>
                                                        <button id="btnAdd">
                                                            <img id="iconAdd" src={ IconAdd } alt="Add Commit" title="Agregar Observacion"/>
                                                        </button>
                                                    </td>
                                                </tr>   
                                                )
                                            }                                           
                                        } ) }                                                        
                                    </tbody>
                                </table>
                                <legend className='divModalAdvances'>{ icons[2] }Estudiantes Inscritos</legend>
                                <table className="table table-striped table-hover table-sm">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>ID Estud.</th>
                                            <th>Nombre</th>
                                            <th>Fecha Ingreso</th>
                                            <th>Fecha Egreso</th>
                                            <th>Estado</th>
                                            <th>Accion</th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>
                                        { dataInsc && dataInsc.filterInscription.map(insc => {                                                
                                            console.log(dataInsc.filterInscription.length);
                                            return (
                                                <tr>
                                                    <th>{ insc.Estudiante.Identificacion }</th>
                                                    <td>{ `${insc.Estudiante.Nombre} ${insc.Estudiante.Apellido}` }</td>
                                                    <td>{ insc.Fecha_Ingreso }</td>
                                                    <td>{ insc.Fecha_Egreso }</td>
                                                    <td>{ insc.Estado }</td>
                                                    <td>
                                                        <button className="btnAvance">
                                                            <img id="iconAdd" src={ IconAcept } alt="Add Student" title="Agregar Estudiante"/>
                                                        </button>
                                                        <button className="btnAvance">
                                                            <img id="iconAdd" src={ IconCancel } alt="Delete Student" title="Eliminra Estudiante"/>
                                                        </button>
                                                    </td>
                                                </tr>   
                                            )                                                
                                        }) }
                                    </tbody>
                                </table>
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
