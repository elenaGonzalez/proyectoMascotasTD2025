import React, { useState, useEffect } from 'react';
import './cards.css';

const Cards = () => {
    const [mascotas, setMascotas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/mascotas');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                console.log('Datos recibidos:', data); // Para depuración
                setMascotas(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar las mascotas:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);


    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            padding: '1rem',
        }}>
            {mascotas.map((mascota, index) => (
                <div key={index}
                    className="card"
                    style={{ width: 'calc(30% - 1rem)', minWidth: '250px' }}>
                    <img
                        className="card-img-top"
                        src={mascota.imagen || 'https://via.placeholder.com/150'}
                        alt={mascota.nombre} />
                    <div className="card-body">
                        <h5 className="dog-name">{mascota.nombre}</h5>
                        <p className="card-text">{mascota.descripcion}</p>
                        <div className="card-footer">
                            <div className="dog-age">
                                <span>🐶 </span> {mascota.edad} años
                            </div>
                            <div className="ciudad">{mascota.ciudad}</div>
                            <a href={`https://wa.me/${mascota.telefono || '123456789'}`} className="whatsapp-link">
                                <img src="https://cdn.freebiesupply.com/images/large/2x/whatsapp-logo-transparent.png" alt="WhatsApp" style={{ width: '35px', height: '35px' }} />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
