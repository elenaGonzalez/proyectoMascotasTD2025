import React from 'react';

const Cards = () => {
    // Array de ejemplo con 4 cards
    const cardsData = [
        {
            title: "Card 1",
            text: "Texto de ejemplo 1",
            imageSrc: "https://www.adoptagratis.com/wp-content/uploads/2025/10/IMG_1934-400x300.jpeg.webp",
            buttonLink: "#",
            buttonText: "Ver más"
        },
        {
            title: "Card 2",
            text: "Texto de ejemplo 2",
            imageSrc: "https://www.adoptagratis.com/wp-content/uploads/2025/10/CACHORRO-3-400x300.jpg.webp",
            buttonLink: "#",
            buttonText: "Ver más"
        },
        {
            title: "Card 3",
            text: "Texto de ejemplo 3",
            imageSrc: "https://www.adoptagratis.com/wp-content/uploads/2024/11/20231224_194640-400x300.jpg.webp",
            buttonLink: "#",
            buttonText: "Ver más"
        },
        {
            title: "Card 4",
            text: "Texto de ejemplo 4",
            imageSrc: "https://www.adoptagratis.com/wp-content/uploads/2025/10/IMG_20241217_093830-400x300.jpg.webp",
            buttonLink: "#",
            buttonText: "Ver más"
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            {cardsData.map((card, index) => (
                <div key={index} className="card" style={{ width: 'calc(30% - 1rem)', minWidth: '150px' }}>
                    <img className="card-img-top" src={card.imageSrc} alt={`Card ${index + 1}`} />
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
