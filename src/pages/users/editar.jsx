import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from '../../graphql/usuarios/queries';
import Input from '../../components/Input';
import useFormData from '../../hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations';
import DropDown from '../../components/Dropdown';
import { Enum_EstadoUsuario } from '../../utils/enums';
import ButtonLoading from '../../components/ButtonLoading';
import '../../styles/user.css';
const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });


  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <div className="form-group">
          <label id="label-Nombre">Nombre de la persona:</label>
          <input id="input-Nombre"type="text" className="form-control fila" placeholder="Nombre" name= "Nombre" defaultValue ={queryData.getOneUser.Nombre} required/>
        </div>

        <div className="form-group">
          <label id="label-Apellido">Apellido de la persona:</label>
          <input id="input-Apellido"type="text" className="form-control fila" placeholder="Apellido" name= "Apellido" defaultValue ={queryData.getOneUser.Apellido} required/>
        </div>

        <div className="form-group">
          <label id="label-Email">Correo de la persona:</label>
          <input id="input-Email"type="text" className="form-control fila" placeholder="Email" name= "Email" defaultValue ={queryData.getOneUser.Email} required/>
        </div>

        <div className="form-group">
          <label id="label-Identificacion">Identificación de la persona:</label>
          <input id="input-Identificacion"type="text" className="form-control fila" placeholder="Identificacion" name= "Identificacion" defaultValue ={queryData.getOneUser.Identificacion} required/>
        </div>
        
        <DropDown
          label='Estado de la persona:'
          name='Estado'
          defaultValue={queryData.getOneUser.Estado}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <div className="form-group">
        <span>Rol del usuario: {queryData.getOneUser.Rol}</span>
        </div>
        
        <button disabled={Object.keys(formData).length === 0} id="btn-register" type="submit" className="btn btn-dark btn-lg btn-block fila">Confirmar</button>
      </form>
    </div>
  );
};

export default EditarUsuario;