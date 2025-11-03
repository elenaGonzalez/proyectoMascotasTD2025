import React from 'react';
import cardsData from './dataHardcodeada';
import './cards.css';

const Cards = () => {
    // Array de ejemplo con 4 cards


    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            padding: '1rem',

        }}>
            {cardsData.map((card, index) => (
                <div key={index}
                    className="card"
                    style={{ width: 'calc(30% - 1rem)', minWidth: '250px' }}>

                    <img
                        className="card-img-top"
                        src={card.imageSrc}
                        alt={card.title} />

                    <div className="card-body">
                        <h5 className="dog-name">{card.name}</h5>
                        <p className="card-text">{card.text}</p>
                        <div className="card-footer">
                            <div className="dog-age">
                                <span>🐶 </span> {card.edad}
                            </div>
                            <div className="ciudad">{card.ciudad}</div>
                            <a href="https://wa.me/123456789" className="whatsapp-link">
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
