
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarios } from "../redux/adminSlice";
import Table from 'react-bootstrap/Table';
import Footer from '../component/layout/Footer';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const PanelAdmin = () =>{
     const [admin_token, setToken] = useState({
        id:"",
        role:""
     });

    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.admin.usuarios);
     
    useEffect(()=>{
        const fetchUsuarios = async () => {
        try {
        const decodedToken = jwtDecode(localStorage.getItem('token'));
        setToken({
            id: decodedToken.id,
            role: decodedToken.role
        });
        const res = await axios.get(`http://localhost:3000/api/usuarios`);
       
         dispatch(setUsuarios(res.data));
         
        } catch (error) {
        console.error('Error al decodificar el token:', error);
        }
    };
    fetchUsuarios();
  },[dispatch]);
    

    const handlerBajaLogica = async(id, activo) =>{
      await axios({
      method: "post",
      url: "http://localhost:3000/api/usuarios/cambiarstatus",
      data: {
      id: id,
      activo: activo,
    }
    }).then((res) => console.log(res.data))
      const respuesta =await axios.get(`http://localhost:3000/api/usuarios`)
      dispatch(setUsuarios(respuesta.data));
    }

    const handlerCambioRol = async(id, role) =>{
      await axios({
      method: "post",
      url: "http://localhost:3000/api/usuarios/promover/degradar",
      data: {
      id: id,
      role: role,
    }
    }).then((res) => console.log(res.data))
      const resp =await axios.get(`http://localhost:3000/api/usuarios`)
      dispatch(setUsuarios(resp.data));
    }

    return(
        <div>
         <Container>
        <h1>Panel de Admin</h1>
        <h3>Lista de Usuarios</h3>
          <Table responsive="sm">
        <thead>
          <tr className='text-center'>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
         <tbody className='text-center'>
        {usuarios && usuarios?.map(usuario => (
            <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.role}</td>
            <td>{usuario.activo == true ? "activo" : "inactivo"}</td>
            <td>
              <>
              <Button variant="danger" onClick={() => handlerBajaLogica(usuario.id, !usuario.activo)}>
                {usuario.activo ? "Desactivar" : "Reactivar"}
            </Button>
            <Button variant="success" onClick={() => handlerCambioRol(usuario.id, usuario.role == "usuario" ? "admin" : "usuario")}>
                {usuario.role == "usuario" ? "Promover" : "Degradar"}
            </Button>
            </>
            </td>
            </tr>
        ))}
        </tbody>

        </Table>
        <Footer />
        </Container>
        </div>
    )
  }

  export default PanelAdmin;