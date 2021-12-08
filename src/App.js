import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/login/LoginPage";
import SideBar from "./components/sidebar/SideBar";
import MyProjects from "./pages/projects/myProjects/MyProjects";
import ProjectsAdmin from "./pages/projects/projectsAdmin/ProjectsAdmin";
import ProjectsEstud from "./pages/projects/projectsEstud/ProjectsEstud";
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import ProjectsLiderPage from './pages/projects/projectsLider/ProjectsLiderPage';
import IndexUsuarios from './pages/users';
import EditarUsuario from './pages/users/editar';

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './context/authContext';
import { UserContext } from './context/userContext';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/auth/register';
import Login from './pages/auth/login';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {

  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});


function App() {

  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };


  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);



  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
          <Routes>
              <Route path='/' element={ <SideBar /> }>
                    <Route path='/usuarios' element={<IndexUsuarios />} />
                    <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                    <Route path='/proyectosAdmin' element={ <ProjectsAdmin /> } />
                    <Route path='/proyectosLider' element={ <ProjectsLiderPage /> } />
                    <Route path='/proyectosEstud' element={ <ProjectsEstud /> } />
                    <Route path='/misProyectos' element={ <MyProjects /> } />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
