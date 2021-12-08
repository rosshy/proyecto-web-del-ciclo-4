import React, { useEffect } from 'react';
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from '../../hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/auth/mutations';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

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
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div>
        <h3>Iniciar sesión</h3>
        <hr />
        <div className="form-group">
          <label id="label-email">Correo Electrónico</label>
          <input
            id="input-email"
            type="email"
            className="form-control"
            placeholder="Ingresar correo electrónico"
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
            required
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Recordar Contraseña
            </label>
          </div>
        </div>

        <button  id="btn-login" type="submit" className="btn btn-dark btn-lg btn-block">
          Ingresar
        </button>
        {/* <p className="forgot-password text-right">
                  ¿Has olvidado tu <a href="#">contraseña?</a>
              </p> */}
        <p className="not-registered text-left">
          ¿Aún no estas registrado? <a href="/auth/register">Crea tu cuenta</a>
        </p>
    </div>
  );
};

export default Login;