import './cards.css';

const Cards = ({ mascotas }) => {
    // Array de ejemplo con 4 cards


    return (
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
    );
};

export default Cards;
