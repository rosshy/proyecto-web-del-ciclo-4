import React from "react";
import LoginPage from "./pages/login/LoginPage";
import SideBar from "./components/sidebar/SideBar";
import MyProjects from "./pages/projects/myProjects/MyProjects";
import ProjectsAdmin from "./pages/projects/projectsAdmin/ProjectsAdmin";
import ProjectsEstud from "./pages/projects/projectsEstud/ProjectsEstud";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsLiderPage from './pages/projects/projectsLider/ProjectsLiderPage';
import IndexUsuarios from './pages/users';
import EditarUsuario from './pages/users/editar';
function App() {
  return (
    <div>
      <Router>
        <SideBar />
        <Routes>
          <Route path='/' element={ <LoginPage /> } />
          <Route path='/usuarios' element={<IndexUsuarios />} />
          <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
          <Route path='/proyectosAdmin' element={ <ProjectsAdmin /> } />
          <Route path='/proyectosLider' element={ <ProjectsLiderPage /> } />
          <Route path='/proyectosEstud' element={ <ProjectsEstud /> } />
          <Route path='/misProyectos' element={ <MyProjects /> } />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
