import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormData from '../../hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/auth/mutations';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {

    if (dataMutation) {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   navigate('/');
      // }
      if (!dataMutation.login) {
        toast.error('Usuario y/o contraseña incorrectos');
      } else if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div>
        <h3>Iniciar sesión</h3>
        <hr />
        <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
          <div className="form-group">
            <label id="label-email">Correo Electrónico</label>
            <input
              id="input-email"
              type="email"
              className="form-control"
              placeholder="Ingresar correo electrónico"
              name = "Email"
              required
            />
          </div>

          <div className="form-group">
            <label id="label-password">Contraseña</label>
            <input
              id="input-password"
              type="password"
              className="form-control"
              placeholder="Ingresar contraseña"
              name = "Password"
              required
            />
          </div>

          <button  id="btn-login" type="submit" className="btn btn-dark btn-lg btn-block">
            Ingresar
          </button>
        </form>
        <p className="not-registered text-left">
          ¿Aún no estas registrado? <a href="/auth/register">Crea tu cuenta</a>
        </p>
    </div>
  );
};

export default Login;