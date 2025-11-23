import { useState } from "react";
import "./FiltroPublicaciones.css";

function FiltroPublicaciones({ onChange }) {

const [filters, setFilters] = useState({
    categoria: "",
    genero: "",
    edad: "",
    vacunado: "",
    destetado: "",
    esterilizado: "",
    alimentacion: "",
    antiparacitario: ""
});

const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onChange(newFilters);
};

const handleReset = () => {
    const resetFilters = {
    categoria: "",
    genero: "",
    edad: "",
    vacunado: "",
    destetado: "",
    esterilizado: "",
    alimentacion: "",
    antiparacitario: ""
    };
    setFilters(resetFilters);
    onChange(resetFilters);
};

return (
    <div className="filtros-container container py-3 mb-4">
    <div className="row g-3">

        <div className="col-md-3">
        <select
            className="form-select"
            value={filters.categoria}
            onChange={(e) => handleChange("categoria", e.target.value)}
        >
            <option value="">Categoría</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
        </select>
        </div>

        <div className="col-md-3">
        <select
            className="form-select"
            value={filters.genero}
            onChange={(e) => handleChange("genero", e.target.value)}
        >
            <option value="">Género</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
        </select>
        </div>

        <div className="col-md-2">
        <input
            className="form-control"
            type="number"
            placeholder="Edad"
            value={filters.edad}
            onChange={(e) => handleChange("edad", e.target.value)}
        />
        </div>

        <div className="col-md-2">
        <select
            className="form-select"
            value={filters.vacunado}
            onChange={(e) => handleChange("vacunado", e.target.value)}
        >
            <option value="">Vacunado</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
        </select>
        </div>

        <div className="col-md-2">
        <select
            className="form-select"
            value={filters.destetado}
            onChange={(e) => handleChange("destetado", e.target.value)}
        >
            <option value="">Destetado</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
        </select>
        </div>

        <div className="col-md-2">
        <select
            className="form-select"
            value={filters.esterilizado}
            onChange={(e) => handleChange("esterilizado", e.target.value)}
        >
            <option value="">Esterilizado</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
        </select>
        </div>

        <div className="col-md-3">
        <input
            className="form-control"
            type="text"
            placeholder="Alimentación"
            value={filters.alimentacion}
            onChange={(e) => handleChange("alimentacion", e.target.value)}
        />
        </div>

        <div className="col-md-3">
        <select
            className="form-select"
            value={filters.antiparacitario}
            onChange={(e) => handleChange("antiparacitario", e.target.value)}
        >
            <option value="">Antiparasitario</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
        </select>
        </div>

        <div className="col-md-12 text-end">
        <button className="btn btn-outline-danger mt-2" onClick={handleReset}>
            Limpiar filtros
        </button>
        </div>

    </div>
    </div>
);
}

export default FiltroPublicaciones;
