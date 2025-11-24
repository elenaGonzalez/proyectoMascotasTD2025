import axios from 'axios';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPublicaciones } from "../redux/adminSlice";
import Table from 'react-bootstrap/Table';
import Footer from '../component/layout/Footer';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

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

    return(
        <div>
         <Container>
        <h1>Panel de Admin</h1>
        <h3>Lista de Publicaciones</h3>
          <Table responsive="sm">
        <thead>
          <tr className='text-center'>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
         <tbody className='text-center'>
        {publicaciones && publicaciones?.map(publicacion => (
            <tr key={publicacion.id}>
            <td>{publicacion.titulo}</td>
            <td>{publicacion.descripcion}</td>
            <td>{publicacion.fecha}</td>
            <td>{publicacion.disponible == true ? "activo" : "inactivo"}</td>
            <td>
              <>
              <Button variant="danger" onClick={() => handlerBajaLogica(publicacion.id, !publicacion.activo)}>
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
    )
  }

  export default PublicacionAdmin;