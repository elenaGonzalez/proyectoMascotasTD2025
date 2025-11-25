import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CarruselMascotas.css';

// URL de la API confirmada
const API_URL = 'http://localhost:3000/api/mascotas';
const CAROUSEL_CACHE_KEY = 'carrusel_mascotas_data'; // Clave de caché para localStorage

function CarruselMascotas() {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                // 1. ÉXITO: Guarda la nueva data en caché
                localStorage.setItem(CAROUSEL_CACHE_KEY, JSON.stringify(data));
                setMascotas(data);
                setLoading(false);

            } catch (error) {
                console.error("Fallo la API. Intentando usar datos en caché.", error);
                
                // 2. FALLO: Intenta cargar desde la caché local
                const cachedData = localStorage.getItem(CAROUSEL_CACHE_KEY);
                
                if (cachedData) {
                    setMascotas(JSON.parse(cachedData));
                    // Nota: No se cambia 'loading' a true, ya que la data está disponible
                } else {
                    // Si no hay caché y la API falla, queda vacío
                    setMascotas([]);
                }
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);

    const handleImgError = (e) => {
        if (e && e.target) {
            e.target.src = 'URL_DE_IMAGEN_ALTERNATIVA_AQUI';
        }
    };

    if (loading) {
        return (
            <div className="carrusel-mascotas-root text-center my-5">
                <p>Cargando mascotas destacadas...</p>
            </div>
        );
    }

    if (mascotas.length === 0) {
        return (
            <div className="carrusel-mascotas-root text-center my-5">
                <p>No hay mascotas disponibles.</p>
            </div>
        );
    }

    return (
        <div className="carrusel-mascotas-root container my-5 shadow-lg rounded-4 overflow-hidden bg-white">
            
            <Carousel interval={5000} controls={true} indicators={false} pause="hover">
                {mascotas.map((mascota) => (
                    <Carousel.Item key={mascota.id} className="color-soft-blue">
                        <div className="carousel-slide-content container-fluid">
                            <Row className="w-100 align-items-center gx-4">
                                
                                {/* Columna 1: Imagen circular */}
                                <Col md={4} className="left-col d-flex justify-content-center">
                                    <div className="pet-image-wrap text-center">
                                        <img
                                            className="pet-circle-image"
                                            src={mascota.foto}
                                            alt={`Foto de ${mascota.nombre}`}
                                            loading="lazy"
                                            onError={handleImgError}
                                        />
                                        <h3 className="pet-name mt-3 text-primary">{mascota.nombre}</h3>
                                    </div>
                                </Col>

                                {/* Columna 2: Descripción y datos */}
                                <Col md={8} className="p-4 d-flex flex-column justify-content-center right-col">
                                    <p className="text-terracota fw-bold mb-3" style={{ fontSize: '1.2rem' }}>
                                        {/* Nota: Asumo que el backend devuelve 'descripcion' o usamos un fallback */}
                                        {mascota.descripcion || `¡${mascota.nombre} busca un hogar en ${mascota.ciudad}! Edad: ${mascota.edad} años.`}
                                    </p>

                                    <div className="pet-data d-flex flex-column gap-2 mb-4">
                                        <p className="mb-0 text-dark">Edad: <strong>{mascota.edad} años</strong></p>
                                        <p className="mb-0 text-dark">Vacunado: <strong>{mascota.vacunado ? 'Sí' : 'No'}</strong></p>
                                        <p className="mb-0 text-dark">Género: <strong>{mascota.genero}</strong></p>
                                    </div>

                                    <div className="d-flex align-items-center gap-3">
                                        <Button
                                            variant="success"
                                            href={`https://wa.me/XXXXXXXXXX`} // Usar variable de teléfono real
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="whatsapp-btn"
                                        >
                                            <img
                                                src="https://cdn.freebiesupply.com/images/large/2x/whatsapp-logo-transparent.png"
                                                alt="Icono WhatsApp"
                                                style={{ width: '24px', height: '24px', marginRight: '8px' }}
                                            />
                                            Adoptar
                                        </Button>

                                        <Button variant="outline-dark" className="ver-mas-btn">
                                            Ver más
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default CarruselMascotas;