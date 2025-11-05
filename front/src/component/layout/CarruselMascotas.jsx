import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CarruselMascotas.css';

// Puedes usar imágenes de prueba mientras integran la API.
const mascotasDestacadas = [
  {
    id: 1,
    color: 'soft-blue', // Usaremos esta variable para el color de fondo
    nombre: 'Max',
    descripcion:
      'Max es un golden retriever muy juguetón y cariñoso. Perfecto para una familia con niños, ya que ama correr al aire libre.',
    edad: '2 años',
    tamaño: 'Grande',
    sexo: 'Macho',
    fotoUrl:
      'https://www.adoptagratis.com/wp-content/uploads/2025/10/CACHORRO-3-400x300.jpg.webp',
    whatsappLink: 'tel:+5491155551234' // Enlace de contacto
  },
  {
    id: 2,
    color: 'soft-pink',
    nombre: 'Luna',
    descripcion:
      'Luna es una gata mestiza tranquila y muy independiente. Ideal para personas que viven en apartamentos y buscan compañía relajada.',
    edad: '1 año',
    tamaño: 'Pequeño',
    sexo: 'Hembra',
    fotoUrl:
      'https://www.adoptagratis.com/wp-content/uploads/2025/10/CACHORRO-3-400x300.jpg.webp',
    whatsappLink: 'tel:+5491155554321'
  }
];

// Fallback de clase de color si no coincide el valor
const VALID_COLORS = new Set(['soft-blue', 'soft-green', 'soft-pink']);
function colorClass(color) {
  return VALID_COLORS.has(color) ? `color-${color}` : 'color-soft-blue';
}

// Placeholder SVG en data URL (pequeño) para casos de error de carga
const PLACEHOLDER_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'>
      <rect width='100%' height='100%' fill='#e9f5fb'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#b0c9d9' font-size='28'>imagen no disponible</text>
    </svg>`
  );

function CarruselMascotas() {
  // Handler genérico para fallas de imagen
  const handleImgError = (e) => {
    if (e && e.target) {
      e.target.src = PLACEHOLDER_SVG;
    }
  };

  return (
    <div className="carrusel-mascotas-root">
      <Carousel interval={5000} controls={false} indicators={false} pause="hover">
        {mascotasDestacadas.map((mascota) => (
          <Carousel.Item key={mascota.id} className={colorClass(mascota.color)}>
            <div className="carousel-slide-content container-fluid">
              <Row className="w-100 align-items-center gx-4">
                {/* Columna 1: Círculo y Foto (Izquierda) */}
                <Col md={4} className="left-col d-flex justify-content-center">
                  <div className="pet-image-wrap text-center">
                    <img
                      className="pet-circle-image"
                      src={mascota.fotoUrl}
                      alt={`Foto de ${mascota.nombre}`}
                      loading="lazy"
                      onError={handleImgError}
                    />
                    <h3 className="pet-name mt-3">{mascota.nombre}</h3>
                  </div>
                </Col>

                {/* Columna 2: Descripción y Datos (Derecha) */}
                <Col md={8} className="p-4 d-flex flex-column justify-content-center right-col">
                  <h4 className="pet-desc mb-3">{mascota.descripcion}</h4>

                  <div className="pet-data d-flex flex-column mb-4">
                    <span>Edad: <strong>{mascota.edad}</strong></span>
                    <span>Tamaño: <strong>{mascota.tamaño}</strong></span>
                    <span>Sexo: <strong>{mascota.sexo}</strong></span>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    {/* Botón de WhatsApp - mantuve icono y comportamiento */}
                    <Button
                      variant="success"
                      href={mascota.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Contactar por WhatsApp para adoptar a ${mascota.nombre}`}
                      className="whatsapp-btn"
                    >
                      <img
                        src="https://cdn.freebiesupply.com/images/large/2x/whatsapp-logo-transparent.png"
                        alt="Icono WhatsApp"
                        style={{ width: '24px', height: '24px', marginRight: '8px' }}
                      />
                      Adoptar
                    </Button>

                    {/* Botón secundario de ejemplo (Ver más) */}
                    <Button variant="light" className="ver-mas-btn" aria-label={`Ver más información de ${mascota.nombre}`}>
                      Ver mas
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
