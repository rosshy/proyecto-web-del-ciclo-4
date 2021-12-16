import React, { useState, useEffect } from 'react';
import PrivateLayout from './layouts/PrivateLayout';
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
import './styles/tabla.css';
import { ToastContainer } from 'react-toastify';

const httpLink = createHttpLink({
  uri: 'https://servidor-gql-alphateam21.herokuapp.com/graphql',
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
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };


  useEffect(() => {
    let token =  authToken ? authToken: localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUserData({ 
        _id: decoded._id,
        Nombre: decoded.Nombre,
        Apellido: decoded.Apellido,
        Identificacion: decoded.Identificacion,
        Email: decoded.Email,
        Rol: decoded.Rol,
      });
    }
  }, [authToken]);



  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
          <Routes>
              <Route path='/' element={ <PrivateLayout /> }>
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
          <ToastContainer />
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
