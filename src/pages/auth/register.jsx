import React, { useEffect } from 'react';
import { Enum_Rol } from '../../utils/enums';
import DropDown from '../../components/Dropdown';
import useFormData from '../../hooks/useFormData';
import { Link } from 'react-router-dom';
import { REGISTRO } from '../../graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/authContext';

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation}] =
    useMutation(REGISTRO,  {errorPolicy: 'all'});

  const submitForm = (e) => {
    e.preventDefault();

    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate('/');
      }

      // const token = localStorage.getItem('token');
      // if (token) {
      //   navigate('/');
      // }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <form onSubmit={submitForm} onChange={updateFormData} ref={form}> 
      <h3>Registrar nuevo Usuario</h3>

      <div className="form-group">
          <label id="label-name">Identificación</label>
          <input id="input-name"type="text" className="form-control" placeholder="Identificación" name= "Identificacion" required/>
      </div>

      <div className="form-group">
          <label id="label-name">Nombres</label>
          <input id="input-name"type="text" className="form-control" placeholder="Nombres" name= "Nombre" required/>
      </div>

      <div className="form-group">
          <label id="label-lastname">Apellidos</label>
          <input id="input-lastname"type="text" className="form-control" placeholder="Apellidos" name= "Apellido" required/>
      </div>

      <div className="form-group">
          <label id="label-email">Correo Electrónico</label>
          <input id ="input-email"type="email" className="form-control" placeholder="Ingresar correo electrónico" name= "Email" required/>
      </div>

      <div className="form-group">
          <label id="label-password">Contraseña</label>
          <input id="input-password"type="password" className="form-control" placeholder="Ingresar contraseña" name= "Password" required/>
      </div>

      <div className="form-group">
          <DropDown label='Rol deseado:' name="Rol" required={true} options={Enum_Rol} />
      </div>

      <button id="btn-register" type="submit" className="btn btn-dark btn-lg btn-block">Registrarse</button>
      <p className="forgot-password text-right">
          ¿Ya estás registrado <a href="/auth/login">iniciar sesión?</a>
      </p>

    </form>
  );
};

export default Register;