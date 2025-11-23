// src/component/layout/Cards.jsx
import React from 'react';
import { useSearch } from '../../context/SearchContext.jsx'; 
// Asumo que 'dataHardcodeada' es la fuente de datos estática
import cardsData from './dataHardcodeada'; 
import './cards.css';

// Función para normalizar texto (quitar acentos, minúsculas)
const normalize = (text) =>
  (text ?? '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const Cards = () => {
  // Obtenemos el término de búsqueda del contexto
  const { searchTerm } = useSearch();

  // Lógica de Filtrado: Solo mantiene la parte de la función que devuelve booleano
  const filteredCards = cardsData.filter((card) => {
    if (!searchTerm) return true; // Mostrar todo si no hay término de búsqueda
    
    const q = normalize(searchTerm);
    return (
      normalize(card.name).includes(q) ||
      normalize(card.text).includes(q) ||
      normalize(card.ciudad).includes(q) ||
      normalize(card.edad?.toString()).includes(q)
    );
  });

  // 🚀 RETORNO PRINCIPAL: Renderiza las tarjetas filtradas
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Mapeo del arreglo filtrado */}
      {filteredCards.map((card, index) => (
        <div
          key={index}
          className="card"
          style={{ width: 'calc(30% - 1rem)', minWidth: '250px' }}
        >
          <img
            className="card-img-top"
            src={card.imageSrc}
            alt={card.title}
          />

          <div className="card-body">
            <h5 className="dog-name">{card.name}</h5>
            <p className="card-text">{card.text}</p>

            <div className="card-footer">
              <div className="dog-age">
                <span>🐶 </span> {card.edad}
              </div>
              <div className="ciudad">{card.ciudad}</div>
              <a href="https://wa.me/123456789" className="whatsapp-link">
                <img
                  src="https://cdn.freebiesupply.com/images/large/2x/whatsapp-logo-transparent.png"
                  alt="WhatsApp"
                  style={{ width: '35px', height: '35px' }}
                />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Mensaje si no hay resultados */}
      {filteredCards.length === 0 && (
        <div className="text-center my-4">
          <p>No se encontraron resultados para "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};

export default Cards;