import React from 'react';
import './css/styleSidebar.css';
import Logo from '../images/Alpha_Team_logo.png';
import { Link } from "react-router-dom";

export default function SideBar() {

    return (
        <div className="sidebar body">
            <div className="logoContent">
                <div className="logo logoLink">
                    <i className="fab fa-atlassian"></i>
                    <div className="nameLogo">Alpha Team</div>                    
                </div>
                <i id="btn" className="fab fa-elementor" onClick={ () => {
                    const sidebar = document.querySelector(".sidebar");
                    sidebar.classList.toggle("active");
                } }></i>
            </div>
            <div className="logoAlpha">
                <img id="logoEdit" src={ Logo } alt="Alpha Team" />
            </div>
            <ul className="navList">
                <li>
                    <Link to="/" className="links" id="inicio" >
                        <i className="fas fa-laptop-house"></i>
                        <span className="linksName">Inicio</span>                        
                    </Link>
                    <span className="tooltip">Inicio</span>
                </li>
                <li>
                    <Link to="/usuarios" className="links" >
                        <i className="fas fa-users"></i>
                        <span className="linksName">Usuarios</span>                        
                    </Link>
                    <span className="tooltip">Usuarios</span>
                </li>
                <li>
                    <Link to="/proyectosAdmin" className="links" >
                        <i className="fas fa-users-cog"></i>
                        <span className="linksName">Proyectos Admin</span>                        
                    </Link>
                    <span className="tooltip">Proyectos Admin</span>
                </li>
                <li>
                    <Link to="/proyectosLider" className="links">
                        <i className="fas fa-user-shield"></i>
                        <span className="linksName">Proyectos Lider</span>                        
                    </Link>
                    <span className="tooltip">Proyectos Lider</span>
                </li>
                <li>
                    <Link to="/proyectosEstud" className="links">
                        <i className="fas fa-user-graduate"></i>
                        <span className="linksName">Proyectos Estudiante</span>                        
                    </Link>
                    <span className="tooltip">Pro. Estudiante</span>
                </li>
                <li>
                    <Link to="/misProyectos" className="links">
                        <i class="fas fa-code-branch"></i>
                        <span className="linksName">Mis Proyectos</span>                        
                    </Link>
                    <span className="tooltip">Mis Proyectos</span>
                </li>
            </ul>
        </div>
    )
}
