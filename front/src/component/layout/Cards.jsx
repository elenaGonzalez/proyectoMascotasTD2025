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
                    style={{ width: 'calc(30% - 1rem)', minWidth: '150px' }}>

                    <img
                        className="card-img-top"
                        src={card.imageSrc}
                        alt={card.title} />

                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.text}</p>
                        <a href={card.buttonLink} className="btn btn-primary">
                            {card.buttonText}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
