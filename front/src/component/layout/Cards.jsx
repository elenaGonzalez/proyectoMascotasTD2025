<<<<<<< HEAD
// src/component/layout/Cards.jsx
import React from 'react';
import { useSearch } from '../../context/SearchContext.jsx'; // ➕ agregado
import cardsData from './dataHardcodeada';
import './cards.css';

const normalize = (text) =>
  (text ?? '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // quita acentos

const Cards = () => {
  const { searchTerm } = useSearch(); // ➕ agregado
=======
import './cards.css';

const Cards = ({ mascotas }) => {
    // Array de ejemplo con 4 cards

>>>>>>> development

  // ➕ Filtrado en vivo sin alterar estructura
  const filteredCards = cardsData.filter((card) => {
    if (!searchTerm) return true;
    const q = normalize(searchTerm);
    return (
<<<<<<< HEAD
      normalize(card.name).includes(q) ||
      normalize(card.text).includes(q) ||
      normalize(card.ciudad).includes(q) ||
      normalize(card.edad?.toString()).includes(q)
=======
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            padding: '1rem',

        }}>



            {mascotas.length === 0 ? (<p>No hay mascotas disponibles.</p>) :
                mascotas.map((masco) => (
                    <div key={masco.id}
                        className="card"
                        style={{ width: 'calc(30% - 1rem)', minWidth: '250px' }}>

                        <img
                            className="card-img-top"
                            src={masco.foto}
                            alt={masco.nombre} />

                        <div className="card-body">
                            <h5 className="dog-name">{masco.nombre}</h5>
                            <p className="card-text">{masco.raza}</p>
                            <div className="card-footer">
                                <div className="dog-age">
                                    <span>🐶 </span> {masco.edad}
                                </div>
                                <div className="ciudad">{masco.ciudad}</div>
                                <a href="https://wa.me/123456789" className="whatsapp-link">
                                    <img src="https://cdn.freebiesupply.com/images/large/2x/whatsapp-logo-transparent.png" alt="WhatsApp" style={{ width: '35px', height: '35px' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))},





        </div>
>>>>>>> development
    );
  });

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

      {/* ➕ Mensaje si no hay resultados */}
      {filteredCards.length === 0 && (
        <div className="text-center my-4">
          <p>No se encontraron resultados para "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};

export default Cards;
