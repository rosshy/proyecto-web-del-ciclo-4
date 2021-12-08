import React from 'react';
import './css/styleProjectPage.css';
import IconProject from '../../../components/images/iconProyects.png';
import IconAdd from '../../../components/images/iconAdd.png';
import IconCancel from '../../../components/images/iconCancel.png';
import IconAcept from '../../../components/images/iconAcept.png';

export default function ProjectsPage() {
    const icons = [<i className="fas fa-external-link-alt"></i>];
    return (
        <div className="bodyLider"> 
            <div className="container">
                <img id="iconProject" src={ IconProject } alt="Project" />
                <h2 id="titleLogo">Modulo de Gestion de Proyectos</h2>
                <hr className="hrProject" />
            </div>
            <div id="containMain" className="container border mt-5">
                <form className="row g-3 m-4 mt-2">
                    <div>                        
                        <legend>{ icons[0] } Registrar un Nuevo Proyecto</legend>  
                    </div>                                      
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
                        <input type="number" className="form-control" id="inputID" placeholder="Nombre del Lider del proyecto" />
                    </div>
                    <div className="setDivProject col-md-6 mt-5">
                        <button className="btn btn-secondary setBtnProject" type="reset" >Limpiar Campos</button>                        
                    </div>   
                    <div id="div2Project" className="setDivProject col-md-6 mt-5">
                        <button className="btn btn-primary setBtnProject" type="button" >
                            Registrar Proyecto !!
                        </button>                         
                    </div> 
                    <legend>{ icons[0] } Proyectos Registrados</legend> 
                    <div id="divCards" className="card-group row g-3">
                        <div className="col-md-4">
                            <div className="card text-dark mb-3">
                                <div className="card-header headColor row g-0">
                                    <div className="col-md-3 mt-1"><i className="fas fa-shield-virus iconCard"></i></div>
                                    <div className="col-md-9">Proyecto de Ejemplo Numero 1 </div>                                    
                                </div>
                                <div className="card-body">                                   
                                    <h5 className="card-title">Johan Sebastian Ussa</h5>
                                    <small className="text-muted">ID Lider 10136</small> <br />
                                    <small className="text-muted">Fecha de Inicio: 30/11/2021</small> <br />
                                    <small className="text-muted">Fase: En Desarrollo</small> <br />
                                    <small className="text-muted">Estado: Activo</small> 
                                </div>
                                <div className="card-footer btnCard">
                                    <section>
                                        <button type="button" className="btn btn-primary btn-sm btnCardColor" data-bs-toggle="modal" 
                                            data-bs-target="#modalEditProjectLider">
                                            Ver y/o Actualizar Proyecto
                                        </button>
                                    </section>                                          
                                    <section className="mt-1">
                                        <button type="button" className="btn btn-secondary btn-sm btn2" data-bs-toggle="modal" 
                                            data-bs-target="#modalAvance">
                                            Ver Avances e Inscripciones
                                        </button>     
                                    </section>                                                                                           
                                </div>
                            </div>
                        </div>                                         
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
                                        <label for="inputID" className="form-label-sm">ID del Proyecto</label>
                                        <input readOnly type="text" className="form-control form-control-sm" id="inputID" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputName" className="form-label-sm">Nombre del Proyecto</label>
                                        <input type="text" className="form-control form-control-sm" id="inputName" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label-sm">Objetivos Generales</label>
                                        <textarea className="form-control form-control-sm" placeholder="Objetivos Generales" ></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label-sm">Objetivos Especificos</label>
                                        <textarea className="form-control form-control-sm" placeholder="Objetivos Especificos" ></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="inputPresu" className="form-label-sm">Presupuesto</label>
                                        <input type="number" className="form-control form-control-sm" id="inputPresu" />
                                    </div>
                                    <div className="col-md-4">
                                        <label for="inputDate" className="form-label-sm">Fecha de Inicio</label>
                                        <input readOnly type="text" className="form-control form-control-sm" id="inputDate" />
                                    </div>
                                    <div className="col-md-4">
                                        <label for="inputDate2" className="form-label-sm">Fecha de Terminacion</label>
                                        <input readOnly type="text" className="form-control form-control-sm" id="inputDate2" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="modal fade" id="modalAvance" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header headColor">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Avances e Inscripciones al Proyecto actual
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body m-3 mt-0">
                                <legend>Avances del Proyecto</legend>
                                <table className="table table-striped table-hover table-sm">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>Nombre Creador</th>
                                            <th>Fecha</th>
                                            <th>Descripcion</th>
                                            <th>Observaciones</th>
                                            <th>Agregar</th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Johan Ussa</td>
                                            <td>30/11/2021</td>
                                            <td>Se realiza el avance numero 1 y se corrigieron algunos errores</td>
                                            <td><input type="text" className="form-control form-control-sm" placeholder="No hay Observaciones aun"/></td>
                                            <td>
                                                <button id="btnAdd">
                                                    <img id="iconAdd" src={ IconAdd } alt="Add Commit" title="Agregar Observacion"/>
                                                </button>
                                            </td>
                                        </tr>                                        
                                    </tbody>
                                </table>
                                <legend>Estudiantes Inscritos</legend>
                                <table className="table table-striped table-hover table-sm">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>Id Estudiante</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Estado</th>
                                            <th>Accion</th>
                                        </tr>                                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>10136</th>
                                            <td>Johan Sebastian Ussa</td>
                                            <td>johanuss0405@gmail.com</td>
                                            <td>PENDIENTE</td>
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
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>               
                
            </div> <br />            
        </div>
    )
}
