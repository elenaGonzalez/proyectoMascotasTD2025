import { Link } from "react-router-dom";
import "./cards.css";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';


const CardNew = ({
  id,
  titulo,
  telefono,
  fecha_publicacion,
  descripcion,
  nombre,
  mascota_id,
  genero,
  edad,
  vacunado,
  raza,
  foto,
  ciudad,
  usuarioId,
  showFooter = true,  // nueva prop
  handleDelete
}) => {
  let date;
  let enlace = "";
  if (fecha_publicacion) {
    date = new Date(fecha_publicacion);
  }
  if (id) {
    enlace = `/detalle/publicacion/${id}`;
  } else {
    enlace = '/panel/new';
  }

  return (
    <div
      className="card"
      style={{ width: "calc(30% - 1rem)", minWidth: "25%", maxWidth: "80%" }}
    >
      <Link to={enlace}>
        <img className="card-img-top" src={foto} alt={nombre} />

        <div className="card-body">
          <h5 className="dog-title">{titulo}</h5>
          <p className="card-text">{raza}</p>
          <p className="card-text">{descripcion}</p>
          {raza &&
            <div>Raza : {raza}</div>}
          {edad &&
            <div>Edad : {edad}</div>}
          {genero &&
            <div>Genero : {genero}</div>}
          {vacunado &&
            <div>Vacunado : {vacunado ? "si" : "no"}</div>}
          {ciudad &&
            <div>Ciudad : {ciudad}</div>}

          {// AGREGO UN PROP AL FOOTER PARA MOSTRARLO O NO
          }
          {showFooter && (
            <div className="card-footer">
              <div className="dog-age">
                <span>🐶</span>
              </div>
              <span>{date?.toLocaleDateString()}</span>
              <div className="ciudad">{ciudad}</div>
            </div>
          )}
        </div>

      </Link>
      {handleDelete &&
        <Button variant="btn btn-danger rounded-bottom" class="btn btn-danger" onClick={() => {
          Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Marcar a " + nombre + " como adoptado?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, marcar como adoptado"
          }).then((result) => {
            if (result.isConfirmed) {
              handleDelete(mascota_id);
              Swal.fire({
                title: "¡Hecho!",
                text: nombre + " ha sido marcado como adoptado.",
                icon: "success"
              });
            }
          });
        }}>Marcar a {nombre} como adoptado</Button>
      }
    </div>




  );
};

export default CardNew;
