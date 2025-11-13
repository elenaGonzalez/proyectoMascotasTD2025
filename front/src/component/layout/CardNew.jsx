import { Link } from "react-router-dom";
import "./cards.css";

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
  usuarioId
}) => {
  const date = new Date(fecha_publicacion);
  
  return (
    <div
      className="card"
      style={{ width: "calc(30% - 1rem)", minWidth: "25%", maxWidth: "80%" }}
    >
      <Link to={`/detalle/publicacion/${id}`}>
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
            <div className="card-footer">
            <div className="dog-age">
              <span>🐶</span>
            </div>
            <span>{date.toLocaleDateString()}</span>
            <div className="ciudad">{ciudad}</div>
          </div>
          </div>
      </Link>
    </div>
  );
};

export default CardNew;
