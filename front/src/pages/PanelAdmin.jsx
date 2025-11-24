
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

return (
  <div style={{ background: "#f5f7fa", minHeight: "100vh", paddingTop: "30px" }}>
    <Container>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Panel de Administración</h2>
          <p className="text-muted">Gestión de usuarios registrados</p>
        </div>

        <Link to="/panel/publicaciones">
          <Button variant="outline-primary">Ver Publicaciones</Button>
        </Link>
      </div>

      {/* CARD CONTENEDORA */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <h4 className="mb-3">Lista de Usuarios</h4>

        <Table responsive="sm" bordered hover className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios?.map((usuario) => (
              <tr key={usuario.id}>
                <td className="fw-semibold">{usuario.nombre}</td>
                <td>{usuario.apellido}</td>

                {/* ROL */}
                <td>
                  {usuario.role === "admin" ? (
                    <span className="badge bg-primary">Admin</span>
                  ) : (
                    <span className="badge bg-secondary">Usuario</span>
                  )}
                </td>

                {/* ESTADO */}
                <td>
                  {usuario.activo ? (
                    <span className="badge bg-success">Activo</span>
                  ) : (
                    <span className="badge bg-danger">Inactivo</span>
                  )}
                </td>

                {/* ACCIONES */}
                <td>
                  <div className="d-flex justify-content-center gap-2">

                    {/* Botón Activar/Desactivar */}
                    <Button
                      variant={usuario.activo ? "danger" : "success"}
                      size="sm"
                      onClick={() =>
                        handlerBajaLogica(usuario.id, !usuario.activo)
                      }
                    >
                      {usuario.activo ? "Desactivar" : "Reactivar"}
                    </Button>

                    {/* Botón Promover/Degradar */}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() =>
                        handlerCambioRol(
                          usuario.id,
                          usuario.role === "usuario" ? "admin" : "usuario"
                        )
                      }
                    >
                      {usuario.role === "usuario" ? "Promover" : "Degradar"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-5">
        <Footer />
      </div>
    </Container>
  </div>
);

  }

  export default PanelAdmin;