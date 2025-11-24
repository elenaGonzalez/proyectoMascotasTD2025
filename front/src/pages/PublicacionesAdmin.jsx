import axios from 'axios';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPublicaciones } from "../redux/adminSlice";
import Table from 'react-bootstrap/Table';
import Footer from '../component/layout/Footer';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const PublicacionAdmin = () =>{

    const dispatch = useDispatch();
    const publicaciones = useSelector((state) => state.admin.publicaciones);
     
    useEffect(()=>{
        const fetchPublicaciones = async () => {
        try {
        const res = await axios.get(`http://localhost:3000/api/publicaciones/1/100`);
         dispatch(setPublicaciones(res.data));
         
        } catch (error) {
        console.error('Error:', error);
        }
    };
    fetchPublicaciones();
  },[dispatch]);
    

    const handlerBajaLogica = async(id, activo) =>{
      await axios({
      method: "post",
      url: "http://localhost:3000/api/publicaciones/cambiarstatus",
      data: {
      id: id,
      activo: activo,
    }
    }).then((res) => console.log(res.data))
      const respuesta =await axios.get(`http://localhost:3000/api/publicacions`)
      dispatch(setPublicaciones(respuesta.data));
    }

return (
  <div style={{ background: "#f5f7fa", minHeight: "100vh", paddingTop: "30px" }}>
    <Container>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Panel de Administración</h2>
          <p className="text-muted">Gestión de publicaciones</p>
        </div>

        <Link to="/panel/admin">
          <Button variant="outline-primary">Lista de Usuarios</Button>
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
        <h4 className="mb-3">Lista de Publicaciones</h4>

        <Table responsive="sm" hover bordered className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {publicaciones?.rows?.map((publicacion) => (
              <tr key={publicacion.id}>
                <td className="fw-semibold">{publicacion.titulo}</td>
                <td>{publicacion.descripcion}</td>
                <td>{publicacion.fecha}</td>
                <td>
                  {publicacion.disponible ? (
                    <span className="badge bg-success">Activo</span>
                  ) : (
                    <span className="badge bg-danger">Inactivo</span>
                  )}
                </td>

                <td>
                  <Button
                    variant={publicacion.disponible ? "danger" : "success"}
                    size="sm"
                    onClick={() =>
                      handlerBajaLogica(publicacion.id, !publicacion.activo)
                    }
                  >
                    {publicacion.disponible ? "Desactivar" : "Reactivar"}
                  </Button>
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

  export default PublicacionAdmin;