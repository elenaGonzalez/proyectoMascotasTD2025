import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setPublicaciones } from "../redux/adminSlice";
import Table from "react-bootstrap/Table";
import Footer from "../component/layout/Footer";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const PublicacionAdmin = () => {
  const dispatch = useDispatch();
  const publicaciones = useSelector((state) => state.admin.publicaciones);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost:3000/api/publicaciones/admin/1/100",
          data: {
            role: "admin",
          },
        });
        dispatch(setPublicaciones(res.data));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPublicaciones();
  }, [dispatch]);

  const handlerBajaLogica = async (id, disponible) => {
    await axios({
      method: "post",
      url: "http://localhost:3000/api/publicaciones/cambiar/status",
      data: {
        id: id,
        disponible: disponible,
      },
    }).then((res) => console.log(res.data));
    const respuesta = await axios({
      method: "post",
      url: "http://localhost:3000/api/publicaciones/admin/1/100",
      data: {
        role: "admin",
      },
    });
    console.log("En publi respuesta ", respuesta);
    dispatch(setPublicaciones(respuesta.data));
  };

  return (
    <div>
      <Container>
        <h1>Panel de Admin</h1>
        <h3>Lista de Publicaciones</h3>
        <Table responsive="sm">
          <thead>
            <tr className="text-center">
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Fecha</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {publicaciones &&
              publicaciones?.rows?.map((publicacion) => (
                <tr key={publicacion.id}>
                  <td>{publicacion.titulo}</td>
                  <td>{publicacion.descripcion}</td>
                  <td>{publicacion.fecha}</td>
                  <td>
                    {publicacion.disponible == true ? "activo" : "inactivo"}
                  </td>
                  <td>
                    <>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handlerBajaLogica(
                            publicacion.id,
                            !publicacion.disponible
                          )
                        }
                      >
                        {publicacion.disponible ? "Desactivar" : "Reactivar"}
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
  );
};

export default PublicacionAdmin;
